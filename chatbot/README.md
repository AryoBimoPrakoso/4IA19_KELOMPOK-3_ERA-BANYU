# Era Banyu Chatbot

AI-powered customer service chatbot untuk Era Banyu Packaging.

## Setup

1. Copy `.env.example` ke `.env` dan isi nilai yang sesuai:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Jalankan server:
   ```bash
   uvicorn api.index:app --reload --port 8000
   ```

## API Endpoints

- `POST /predict` - Kirim pesan ke chatbot
  ```json
  {"message": "Halo, saya butuh kemasan untuk makanan"}
  ```

- `GET /health` - Health check endpoint

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | API key dari Groq untuk AI model |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Firebase credentials (JSON string) |
| `PRODUCT_BASE_URL` | Base URL untuk link produk |
