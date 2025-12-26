# --- Connect to Google Drive ---
from google.colab import drive
drive.mount('/content/drive')

# --- Import libraries ---
from datasets import load_dataset
import json
import os

# --- Load dataset from Hugging Face ---
ds = load_dataset("HackHedron/English_Telugu_Parallel_Corpus")

# --- Convert dataset to list of dictionaries ---
records = [dict(row) for row in ds['train']]

# --- Output path inside Google Drive ---
output_path = "/content/drive/MyDrive/source_target.json"

# --- Save JSON to Google Drive ---
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(records, f, ensure_ascii=False, indent=4)

print("Saved JSON file to:", output_path)