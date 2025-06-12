from huggingface_hub import snapshot_download

# Download and cache the models
snapshot_download(repo_id="sentence-transformers/all-mpnet-base-v2", local_dir="Backendpy/hf_models/all-mpnet-base-v2")
snapshot_download(repo_id="cross-encoder/ms-marco-MiniLM-L-6-v2", local_dir="Backendpy/hf_models/ms-marco-MiniLM-L-6-v2")
snapshot_download(repo_id="sshleifer/distilbart-cnn-12-6", local_dir="Backendpy/hf_models/distilbart-cnn-12-6")
