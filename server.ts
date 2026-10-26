import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Gemini client setup
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Chat endpoint for Credit Health Coach
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { persona, message, history } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'NO_KEY',
        message: 'No active GEMINI_API_KEY configured. Falling back to local coach.',
      });
    }

    const personaSummary = persona
      ? `Persona: ${persona.name || 'User'}
Score: ${persona.score !== null ? persona.score : 'Thin-file (No bureau score)'}
Band: ${persona.band || 'Unknown'}
Utilization: ${persona.utilization || 0}%
Payment History: ${persona.paymentHistory || 0}% on-time
Credit Age: ${persona.creditAge || 'N/A'}
Inquiries: ${persona.enquiries || 0} in past 6 months
Active Debts: ${
          persona.debts && persona.debts.length > 0
            ? persona.debts
                .map(
                  (d: any) =>
                    `${d.name}: ₹${d.balance} balance, EMI ₹${d.emi}/mo, ${d.rate}% interest`
                )
                .join('; ')
            : 'No active debts'
        }`
      : 'Standard credit user profile';

    const systemInstruction = `You are a warm, knowledgeable, and concise Credit Health Coach inside a UPI payments mobile app.
Current User Profile:
${personaSummary}

CRITICAL RULES:
1. Answer in simple, direct, accessible English (2 short paragraphs max or 3 brief bullet points).
2. Give actionable, concrete steps (e.g. paying down credit card utilization before statement generation date, setting UPI AutoPay for EMIs, checking for incorrect bureau entries).
3. NEVER promise loan or credit card approvals or guarantee score increases. Emphasize that approvals depend strictly on lender underwriting.
4. If the user is Thin-file (no score), guide them to start with a secured credit card (fixed-deposit backed) or UPI credit line.
5. If the user is Subprime (low score), focus on clearing overdue EMIs, disputing errors, and avoiding hard inquiries.
6. Always end with or include the exact disclaimer: "Mock data, not financial advice."`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-4)) {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Keep your credit card balance below 30% and set up UPI AutoPay to avoid missed payments. Mock data, not financial advice.';
    return res.json({ reply });
  } catch (error: any) {
    console.warn('Gemini chat request error:', error?.message || error);
    return res.status(500).json({
      error: 'API_ERROR',
      message: error?.message || 'Gemini API call failed',
    });
  }
});

// Start Vite in dev mode or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Credit Health server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
