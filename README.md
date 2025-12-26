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

Running the Application
Backend (Flask)
cd backend
pip install -r requirements.txt
python app.py


Server runs at:

http://127.0.0.1:5000

Frontend (Vite + React)
cd frontend
npm install
npm run dev


Application runs at:

http://localhost:5173

Experiments Conducted

Transformer size comparison (small vs standard)

Shared vs separate vocabularies

Label smoothing ablation

Dropout tuning

From-scratch vs pre-trained comparison

Attention and positional encoding ablations

Reproducibility

Fixed random seeds

Version-controlled configurations

Saved tokenizer models

Checkpointed training states

Logged metrics and experiments

Hardware & Compute

GPU recommended (16GB+ VRAM)

Gradient accumulation for low-resource setups

Mixed precision for faster training

Team

TEAM 28 — KIET AID
From Scratch Translation Models

Acknowledgements

Vaswani et al., Attention Is All You Need

Hugging Face Transformers

AI4Bharat

Meta AI (NLLB)

Google Research (FLAN)
