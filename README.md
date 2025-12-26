From Scratch Translation Models (English ↔ Telugu)

TEAM 28 – KIET AID

Overview

This project implements Neural Machine Translation (NMT) for English ↔ Telugu using Transformer-based models.
We focus on understanding translation systems from first principles, while also comparing performance with state-of-the-art pre-trained models.

A web-based interface is provided to demonstrate real-time translation using a React (Vite) frontend and a Flask backend.

Objectives

Build a Transformer encoder–decoder model from scratch

Design a complete data preprocessing and training pipeline

Evaluate models using BLEU, sacreBLEU, and chrF

Compare from-scratch models with Google FLAN and Facebook NLLB

Deliver a reproducible repository with clear documentation

Tech Stack
Frontend

Vite

React.js

JavaScript, HTML, CSS

Backend

Flask (Python)

REST API for translation inference

Machine Learning

Neural Networks

Transformer Architecture

PyTorch

SentencePiece Tokenization

Pre-trained Models

Google FLAN

Facebook NLLB

Models Implemented
From-Scratch Transformer

Encoder–Decoder architecture

Multi-Head Attention

Positional Encoding

Teacher forcing with cross-entropy loss

Baseline Models (Comparison)

Google FLAN (instruction-tuned)

Facebook NLLB (multilingual translation)

Datasets

Samanantar (English–Indic parallel corpus)

OPUS / Tatoeba (clean aligned sentences)

FLORES-101 (evaluation benchmark)

All datasets are used in accordance with their licenses.

Evaluation Metrics

BLEU / sacreBLEU

chrF

Qualitative error analysis

Project Structure
project-root/
├── frontend/        # Vite + React application
├── backend/         # Flask API
├── src/             # Model, training, evaluation code
├── data/            # Raw and processed datasets
├── experiments/     # Experiment configurations
├── notebooks/       # Analysis and exploration
├── checkpoints/     # Model checkpoints (Git LFS)
├── docs/            # Architecture & results
└── scripts/         # Training and evaluation scripts

Running the Project
Backend (Flask)
cd backend
pip install -r requirements.txt
python app.py

Frontend (Vite + React)
cd frontend
npm install
npm run dev

Key Learnings

Transformer internals and attention mechanisms

Challenges of low-resource language translation

Importance of tokenization and data quality

Trade-offs between training from scratch and fine-tuning pre-trained models
