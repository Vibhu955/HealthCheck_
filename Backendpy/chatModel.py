from fastapi import HTTPException
import torch
import pandas as pd
import os
import re
import hashlib
from sentence_transformers import SentenceTransformer, CrossEncoder
from transformers import pipeline
from concurrent.futures import ThreadPoolExecutor
import faiss

# dataset
df = pd.read_csv("Backendpy/20220401_counsel_chat.zip")
df.dropna(subset=["questionText", "questionTitle", "answerText", "therapistInfo", "therapistURL"], inplace=True)
df.reset_index(drop=True, inplace=True)
df["combinedQuestion"] = df["questionTitle"].str.strip() + " - " + df["questionText"].str.strip()

# loading Models
device = "cuda" if torch.cuda.is_available() else "cpu"
embed_model = SentenceTransformer("Backendpy/hf_models/all-mpnet-base-v2")
reranker = CrossEncoder("Backendpy/hf_models/ms-marco-MiniLM-L-6-v2", device=device)
summarizer = pipeline("summarization", model="Backendpy/hf_models/distilbart-cnn-12-6", device=0 if torch.cuda.is_available() else -1)

# loading Embeddings and Index
EMBED_PATH = "mpnet_embeddings.pt"
INDEX_PATH = "faiss_index.index"
summary_cache = {}
query_cache = {}

if not os.path.exists(EMBED_PATH):
    embeddings = embed_model.encode(df["combinedQuestion"].tolist(), convert_to_tensor=True, show_progress_bar=True, normalize_embeddings=True)
    # print(f"Generated embeddings for {len(embeddings)} questions.")
    torch.save(embeddings, EMBED_PATH)
else:
    embeddings = torch.load(EMBED_PATH)

if not os.path.exists(INDEX_PATH):
    index = faiss.IndexFlatIP(embeddings.shape[1])
    # print(f"FAISS index - {embeddings.shape[0]} vectors.")
    index.add(embeddings.cpu().numpy())
    faiss.write_index(index, INDEX_PATH)
else:
    index = faiss.read_index(INDEX_PATH)

# hashing 
def hash_text(text: str) -> str:
    # print(hashlib.md5(text.encode()).hexdigest())
    return hashlib.md5(text.encode()).hexdigest()
# regex to build URL
def build_psychologytoday_url(name: str) -> str:
    cleaned = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', ' ', name)
    cleaned = re.sub(r'[\d/]+', '', cleaned)
    capitalized_words = re.findall(r'\b[A-Z][a-zA-Z\-]*\b', cleaned)
    first_two = capitalized_words[:2] if capitalized_words else ["Therapist"]
    query = '+'.join(first_two)
    return f"https://www.psychologytoday.com/us/therapists?search={query}"

# final ans formatting
def format_answer(idx, row, summary):
    therapist = row.therapistInfo.strip()
    topic = row.topic.strip() if pd.notna(row.topic) else "Unknown"
    therapist_url = build_psychologytoday_url(therapist)
    views = int(row.views) if pd.notna(row.views) else 0
    upvotes = int(row.upvotes) if pd.notna(row.upvotes) else 0
    answer = row.answerText.strip()

    return {
        "index": idx + 1,
        "therapist": therapist,
        "therapist_url": therapist_url,
        "topic": topic,
        "views": views,
        "upvotes": upvotes,
        "summary": summary,
        "answer": answer
    }

# hash the text and summarize
def summarize(text):
    key = hash_text(text)
    if key in summary_cache:
        return summary_cache[key]
    print("length of text:", len(text))
    short_text = text[:512] if len(text) > 512 else text
    result = summarizer(short_text)[0]["summary_text"]
    # print(f"Summarized text for key : {key}, summary: {summarizer(short_text)[0]}") 
    summary_cache[key] = result
    return result

# check hash , if not then process the query
def process_query(query: str):
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    query_key = hash_text(query)
    if query_key in query_cache:
        return query_cache[query_key]

    query_embedding = embed_model.encode([query], convert_to_tensor=True, normalize_embeddings=True)
    D, I = index.search(query_embedding.cpu().numpy(), k=50)
    filtered_indices = [i for i, score in zip(I[0], D[0]) if score >= 0.4]

    if not filtered_indices:
        raise HTTPException(status_code=404, detail="No relevant answers found.")
    
    top_df = df.iloc[filtered_indices].copy()
    pairs = [[query, f"{row.combinedQuestion} {row.answerText}"] for row in top_df.itertuples()]
    rerank_scores = reranker.predict(pairs)
    top_df["rerank_score"] = rerank_scores
    top_df = top_df.sort_values(by=["rerank_score", "views", "upvotes"], ascending=[False, False, False]).head(3)

    summaries, results = [], []
    with ThreadPoolExecutor() as executor:
        sum_futures = [executor.submit(summarize, row.answerText) for row in top_df.itertuples()]
        for idx, (row, future) in enumerate(zip(top_df.itertuples(), sum_futures)):
            sum_text = future.result()
            summaries.append(sum_text)
            results.append(format_answer(idx, row, sum_text))

    final_summary = summarizer(" ".join(summaries))[0]["summary_text"]
    output = {"results": results, "final_summary": final_summary}
    # print(f"Processed query: {query}, results: {len(results)}")
    query_cache[query_key] = output
    return output

