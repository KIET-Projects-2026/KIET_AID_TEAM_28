# From Scratch Neural Machine Translation (English ↔ Telugu)
### TEAM 28 — KIET AID

---

## Overview

This project explores **Neural Machine Translation (NMT)** by building a **Transformer-based encoder–decoder model from scratch** for **English ↔ Telugu** translation.  
The objective is to understand the internal mechanics of modern translation systems and compare a custom-built model against **state-of-the-art pre-trained models**.

In addition to model training and evaluation, we provide a **full-stack web application** that allows users to translate text through a browser interface.

---

## Key Objectives

- Implement a **Transformer architecture from first principles**
- Design a complete **data processing and training pipeline**
- Evaluate translation quality using standard metrics
- Compare results with **pre-trained multilingual models**
- Deliver a reproducible research-oriented repository
- Provide an interactive **web-based translation demo**

---

## System Architecture

User (Browser)
↓
React + Vite Frontend
↓ REST API
Flask Backend (Inference Server)
↓
Neural Translation Models

yaml
Copy code

---

## Technology Stack

### Frontend
- **Vite**
- **React.js**
- JavaScript, HTML, CSS
- REST API integration

### Backend
- **Flask (Python)**
- RESTful API endpoints
- Model inference and request handling

### Machine Learning & NLP
- **Neural Networks**
- **Transformer (Encoder–Decoder)**
- **PyTorch**
- **SentencePiece (BPE / Unigram)**
- Mixed Precision Training (FP16)

### Pre-trained Models (Baselines)
- **Google FLAN**
- **Facebook NLLB (No Language Left Behind)**

### Evaluation & Experimentation
- BLEU / sacreBLEU
- chrF
- TensorBoard / Weights & Biases

---

## Model Implementations

### 1. Transformer (From Scratch)
- Multi-Head Self-Attention
- Positional Encoding
- Feed-Forward Networks
- Residual Connections + Layer Normalization
- Teacher Forcing with Cross-Entropy Loss
- Label Smoothing and Dropout

### 2. Pre-trained Baselines
- Google FLAN: instruction-tuned multilingual model
- Facebook NLLB: large-scale multilingual translation model  
Used strictly for **benchmark comparison**

---

## Data Sources

- **Samanantar** – Large-scale English–Indic parallel corpus
- **OPUS / Tatoeba** – Clean aligned sentence pairs
- **FLORES-101** – High-quality evaluation benchmark

All datasets are processed with:
- UTF-8 normalization
- Length filtering
- Deduplication
- Train / Validation / Test splits

---

## Evaluation Metrics

- **BLEU / sacreBLEU** – Standard MT evaluation
- **chrF** – Character-level metric (effective for Telugu)
- Qualitative error analysis on sampled outputs

---

## Project Structure

```text
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
├── frontend/            # Vite + React
├── backend/             # Flask API
├── experiments/
├── notebooks/
├── checkpoints/         # ignored / Git LFS
├── logs/
├── docs/
└── scripts/

## Running the Application

### Backend (Flask API)

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
python app.py
The Flask server will start at:

cpp
Copy code
http://127.0.0.1:5000
Frontend (Vite + React)
Navigate to the frontend directory and install dependencies:

bash
Copy code
cd frontend
npm install
npm run dev
The web application will be available at:

arduino
Copy code
http://localhost:5173
Experiments & Analysis
To understand the impact of different design choices, the following experiments were conducted:

Transformer architecture scaling (small vs standard models)

Shared versus separate token vocabularies

Effect of label smoothing

Dropout rate tuning

From-scratch Transformer vs pre-trained models

Ablation studies on attention heads and positional encoding

Reproducibility
The project is designed to be fully reproducible:

Fixed random seeds across experiments

Version-controlled configuration files

Saved tokenizer models and vocabularies

Periodic and best-model checkpoints

Logged training and evaluation metrics

Hardware & Compute Requirements
GPU recommended (minimum 16GB VRAM)

Gradient accumulation for memory-constrained environments

Mixed-precision (FP16) training for faster computation
