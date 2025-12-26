From-Scratch Neural Machine Translation (English ↔ Telugu)
TEAM 28 — KIET AID
Overview

This project implements a Neural Machine Translation (NMT) system for English ↔ Telugu using Transformer-based sequence-to-sequence models built from first principles.
The goal is to deeply understand the theory, implementation, training, and evaluation of modern translation models and to compare them against strong pre-trained baselines.

A web-based interface is provided using React (Vite) on the frontend and Flask on the backend to demonstrate real-time translation.

Key Objectives

Design and implement a Transformer encoder–decoder model from scratch

Build a complete data processing and training pipeline

Evaluate translations using standard MT metrics

Compare performance with pre-trained multilingual models

Ensure reproducibility and clear documentation

Deliver a functional end-to-end translation web application

Technology Stack
Frontend

Vite

React.js

JavaScript, HTML, CSS

REST API integration

Backend

Flask (Python)

Model inference APIs

Request handling & response formatting

Machine Learning

Neural Networks

Transformer (Encoder–Decoder) Architecture

PyTorch

SentencePiece (BPE / Unigram)

Mixed precision training (FP16)

Pre-trained Models (Baselines)

Google FLAN

Facebook NLLB (No Language Left Behind)

Evaluation & Tooling

BLEU / sacreBLEU

chrF

Git, GitHub, Git LFS

TensorBoard / Weights & Biases

Model Approaches
1. From-Scratch Transformer

Token embeddings + positional encoding

Multi-head self-attention

Encoder–decoder cross-attention

Teacher forcing with cross-entropy loss

Label smoothing and dropout for regularization

2. Pre-trained Baselines

Used only for comparison and benchmarking:

Google FLAN (instruction-tuned LLM)

Facebook NLLB (multilingual translation-focused model)

Datasets

Samanantar — large English–Indic parallel corpus

OPUS / Tatoeba — clean aligned sentence pairs

FLORES-101 — high-quality evaluation benchmark

All datasets are cleaned, filtered, aligned, and split into train / validation / test sets with license compliance.

Evaluation Metrics

BLEU / sacreBLEU — standard translation quality metrics

chrF — character-level metric suitable for Telugu

Qualitative error analysis on sampled translations

Project Structure
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
├── frontend/          # Vite + React
├── backend/           # Flask API
├── experiments/
├── notebooks/
├── checkpoints/       # tracked via Git LFS / ignored by Git
├── logs/
├── docs/
└── scripts/

Running the Application
Backend (Flask)
cd backend
pip install -r requirements.txt
python app.py


Runs at:

http://127.0.0.1:5000

Frontend (Vite + React)
cd frontend
npm install
npm run dev


Runs at:

http://localhost:5173

Experiments Conducted

Model scaling (small vs standard Transformer)

Shared vs separate vocabularies

Effect of label smoothing and dropout

Ablation studies (positional encoding, attention heads)

From-scratch model vs pre-trained baselines

Practical Notes

GPU recommended (16 GB+ preferred)

Gradient clipping and accumulation used

Random seeds fixed for reproducibility

Checkpoints and tokenizer configs saved
