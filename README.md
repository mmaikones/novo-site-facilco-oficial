<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Add server env (choose one mode):
   Gemini Developer API:
   `echo 'GEMINI_API_KEY=YOUR_NEW_KEY' > .env.local`
   Vertex AI (recommended for production):
   `echo 'VERTEX_API_KEY=YOUR_VERTEX_KEY\nVERTEX_PROJECT_ID=YOUR_PROJECT_ID\nVERTEX_LOCATION=us-central1' > .env.local`
3. Run app + API routes (recommended):
   `npm run dev:full`
4. Frontend-only mode (without API):
   `npm run dev`

## Deploy (Vercel)

1. Configure production env (choose one mode):
   Gemini Developer API:
   `vercel env add GEMINI_API_KEY production`
   Vertex AI (recommended):
   `vercel env add VERTEX_API_KEY production`
   `vercel env add VERTEX_PROJECT_ID production`
   `vercel env add VERTEX_LOCATION production`
2. Deploy:
   `vercel --prod`
