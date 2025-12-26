🌐 From Scratch Translation Models (English ↔ Telugu)
TEAM 28 – KIET AID Project
📌 Project Overview

This project focuses on building and analyzing neural machine translation (NMT) systems for English ↔ Telugu translation.

We implement:

A Transformer-based encoder–decoder model from scratch

A full data pipeline (cleaning, tokenization, training, evaluation)

A web application with:

Frontend: Vite + React

Backend: Flask (Python)

Comparative analysis against state-of-the-art pre-trained models:

Google FLAN

Facebook NLLB

The project emphasizes learning fundamentals, experimental rigor, and reproducibility.

🎯 Objectives & Deliverables
Goals

Build a Transformer model from first principles

Train and evaluate it on English–Telugu parallel data

Compare performance with strong pre-trained baselines

Provide a usable web interface for translation

Deliverables

Cleaned & tokenized datasets

Transformer architecture implementation

Training & evaluation pipeline

Metrics: BLEU, sacreBLEU, chrF

Error analysis & ablation studies

Web-based translation demo

Reproducible GitHub repository

🧠 Technologies Used (Tech Stack)
Frontend

⚡ Vite

⚛️ React.js

HTML, CSS, JavaScript

REST API integration

Backend

🐍 Flask (Python)

RESTful API for translation requests

Model inference endpoints

Machine Learning / NLP

🤖 Neural Networks

🧩 Transformer (Encoder–Decoder)

🔤 SentencePiece (BPE / Unigram)

🔥 PyTorch

🧪 Evaluation: BLEU, sacreBLEU, chrF

Pre-trained Baselines

🟢 Google FLAN

🔵 Facebook NLLB (No Language Left Behind)

🤗 Hugging Face Transformers

Tools & Utilities

Git & GitHub

Git LFS (for large files)

TensorBoard / Weights & Biases

Python (NumPy, pandas)

📊 Model Approaches
1️⃣ From-Scratch Transformer

Encoder–Decoder architecture

Multi-Head Attention

Positional Encoding

Teacher forcing with cross-entropy loss

Trained only on parallel data

2️⃣ Pre-trained Baselines

Google FLAN: Instruction-tuned large language model

Facebook NLLB: Multilingual translation-focused model

Used for benchmarking & comparison

📂 Project Structure
project-root/
├── README.md
├── data/
│   ├── raw/
│   ├── processed/
│   └── tokenized/
├── src/
│   ├── data/
│   ├── model/
│   ├── train/
│   ├── eval/
│   └── utils/
├── frontend/                  # Vite + React app
├── backend/                   # Flask server
├── experiments/
├── notebooks/
├── checkpoints/               # ignored via git / tracked via LFS
├── logs/
├── docs/
└── scripts/

🚀 How to Run the Project
Backend (Flask)
cd backend
pip install -r requirements.txt
python app.py


Runs on:

http://127.0.0.1:5000

Frontend (Vite + React)
cd frontend
npm install
npm run dev


Runs on:

http://localhost:5173

📈 Evaluation Metrics

BLEU / sacreBLEU – Standard MT quality

chrF – Character-level metric (better for Telugu)

Human qualitative error analysis

🧪 Experiments Conducted

Small vs Standard Transformer

Shared vs Separate vocabularies

Label smoothing on/off

Dropout variations

From-scratch vs Pre-trained models

Ablation studies (positional encoding, attention heads)

⚙️ Practical Considerations

GPU recommended (16GB+ preferred)

Mixed precision (FP16) supported

Gradient accumulation for low-resource setups

Reproducibility via fixed seeds & configs

📚 Datasets Used

Samanantar

OPUS / Tatoeba

FLORES-101 (Evaluation)

Dataset licenses are respected and documented.
