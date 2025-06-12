# To run FastAPI app, command:
# uvicorn qa:app --reload
# pip install fastapi uvicorn pydantic
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from chatModel import process_query  # Ensure this has process_query()

load_dotenv()
FRONTEND_HOST = os.getenv("FRONTEND_HOST", "*") # Default "*" 

# FastAPI App instantiation 
app = FastAPI(
    title="CounselChat Q&A Assistant",
    description="Answer therapy-related questions using semantic search and summarization.",
    version="1.0.0"
)

# CORS for Frontend 
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_HOST],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Schema
class QueryRequest(BaseModel):
    query: str

# app.route for Flask diabetes 
@app.get("/")
def home():
    return {"message": "Hello from QA Model!"}

@app.post("/answers")
async def get_answers(request: QueryRequest):
    try:
        response = process_query(request.query)
        return response
    except HTTPException as e:
        raise e 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) #internal error

# to run app server its required
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("qa:app", host="127.0.0.1", port=8050, reload=True)
