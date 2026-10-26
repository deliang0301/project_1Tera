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
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google Gen AI client with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback intelligent domain response if API key is not yet set
const getFallbackKnowledgeResponse = (prompt: string): string => {
  const p = prompt.toLowerCase();
  if (p.includes('perovskit') || p.includes('perovskite') || p.includes('surya') || p.includes('solar')) {
    return `**Sel Surya Perovskit-Silikon Tandem (Next-Gen Photovoltaic)**

1. **Prinsip Kerja Spektrum Ganda:**
   * Lapisan kristal **Perovskit** di bagian atas menyerap foton berenergi tinggi (spektrum sinar biru dan UV).
   * Lapisan **Silikon tradisional** di bawahnya menyerap foton berenergi lebih rendah (spektrum inframerah).
   * Kombinasi ini menembus batas teoretis silikon konvensional (Shockley-Queisser ~29%), mencapai rekor laboratorium **33.9% - 34.6% efisiensi**.

2. **Analogi:**
   Ibarat saringan ganda: saringan atas menyaring butiran halus berenergi tinggi, saringan bawah menangkap sisa partikel besar, sehingga tidak ada energi matahari yang terbuang sia-sia sebagai panas.

3. **Penerapan Nyata:**
   * Jendela kaca gedung pencakar langit pembangkit mandiri (BIPV).
   * Kanopi atap mobil listrik yang dapat menambah jarak tempuh 20-30 km per hari.
   * Modul atap rumah tangga dengan kebutuhan luas area 40% lebih ringkas.`;
  }

  if (p.includes('angin') || p.includes('wind') || p.includes('terapung') || p.includes('turbin')) {
    return `**Turbin Angin Terapung Lepas Pantai (Floating Offshore Wind)**

1. **Mengapa Harus di Laut Dalam (>60 Meter)?**
   * Sekitar 80% potensi angin samudra dunia berada di kedalaman lebih dari 60 meter di mana tiang pancang dasar laut tidak lagi ekonomis.
   * Kecepatan angin samudra terbuka lebih kencang (30–40% lebih cepat dari darat) dan berhembus stabil 24 jam nonstop tanpa turbulensi kontur bukit/bangunan.

2. **Rumus Daya Angin:**
   $$P = \\frac{1}{2} \\rho A v^3$$
   Daya berbanding kubik ($v^3$) dengan kecepatan angin! Kenaikan angin 20% melipatgandakan produksi listrik hingga +72.8%.

3. **Stabilitas:**
   Menggunakan anjungan apung bersistem pemberat (*spar-buoy*) atau kabel tegangan tinggi (*tension-leg platform*) yang menjaga turbin 15 MW tetap tegak bahkan di ombak setinggi 10 meter.`;
  }

  if (p.includes('hidrogen') || p.includes('hydrogen') || p.includes('power-to-x') || p.includes('peaker')) {
    return `**Hidrogen Hijau & Power-to-X**

1. **Mekanisme Reaksi:**
   Melalui elektroliser PEM (*Proton Exchange Membrane*), air murni ($H_2O$) dipecah menggunakan listrik EBT:
   $$2H_2O (l) + \\text{Listrik EBT} \\rightarrow 2H_2 (g) + O_2 (g)$$

2. **Keunggulan Emisi:**
   Ketika gas hidrogen digunakan dalam *fuel cell* atau mesin turbin peaker, satu-satunya produk sampingannya hanyalah **uap air minum murni ($H_2O$)**, nol emisi karbon ($0\\text{g } CO_2$).

3. **Peran Kunci:**
   Dekarbonisasi sektor industri berat (peleburan baja hijau, pabrik semen, pupuk) serta bahan bakar jarak jauh untuk kapal kargo samudra dan pesawat terbang.`;
  }

  if (p.includes('baterai') || p.includes('sodium') || p.includes('solid-state') || p.includes('lithium') || p.includes('litium')) {
    return `**Revolusi Penyimpanan Energi: Baterai Solid-State & Sodium-Ion**

1. **Baterai Solid-State:**
   * Menggantikan cairan elektrolit mudah terbakar dengan material keramik atau polimer padat.
   * Menghentikan pertumbuhan *dendrit* (kristal mikroskopis perusak separator), menghilangkan risiko ledakan termal (*thermal runaway*) secara total.
   * Pengisian daya ultra-kilat 10 menit untuk 80% kapasitas.

2. **Baterai Sodium-Ion ($Na^+$):**
   * Memanfaatkan ion natrium dari garam dapur biasa yang 1.000 kali lebih melimpah di kerak bumi dibanding litium.
   * Bebas dari ketergantungan tambang kobalt dan nikel yang langka dan mahal.
   * Tahan bekerja di suhu ekstrem minus -20°C hingga +60°C.`;
  }

  if (p.includes('grid') || p.includes('ai') || p.includes('pintar') || p.includes('smart') || p.includes('50 hz')) {
    return `**Jaringan Cerdas Berbasis AI & Virtual Power Plants (VPP)**

1. **Tantangan Intermitensi EBT:**
   Matahari bisa tertutup awan mendung secara tiba-tiba dalam hitungan detik. Jika pasokan turun mendadak, frekuensi grid PLN bisa anjlok dari 50.00 Hz dan memicu pemadaman total (*blackout*).

2. **Solusi AI:**
   * Algoritma *Neural Micro-weather Forecasting* meramal tutupan awan 10-15 menit sebelum terjadi.
   * Dalam tempo kurang dari 50 milidetik, AI mengorkestrasi ribuan baterai rumah warga (*prosumer*) dan pembangkit cadangan untuk menyuntikkan daya penyeimbang secara instan.`;
  }

  return `Halo! Saya adalah **Asisten AI DeLiangTerra**.

Saya dapat membantu Anda memahami berbagai topik teknologi energi terbarukan:
* ☀️ **Sel Surya Perovskit Tandem:** Cara kerja kristal spektrum ganda & efisiensi 33.9%.
* 🌊 **Turbin Angin Terapung:** Fisika hembusan samudra dalam & stabilitas platform apung.
* 💧 **Hidrogen Hijau:** Elektrolisis air, Power-to-X, dan emisi nol bersih.
* 🔋 **Baterai Sodium & Solid-State:** Keamanan elektrolit padat & alternatif litium murah.
* ⚡ **AI Smart Grids:** Penyeimbangan frekuensi 50 Hz & Virtual Power Plants.
* 🛠️ **Panduan DIY EBT:** Konsultasi lampu taman surya, sensor ESP32, atau turbin Savonius.

Silakan ajukan pertanyaan spesifik yang ingin Anda pelajari!`;
};

// API Endpoint for Gemini Assistant
app.post('/api/gemini/assist', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!apiKey) {
      // Graceful offline fallback with comprehensive scientific knowledge
      const fallbackText = getFallbackKnowledgeResponse(message);
      return res.json({ reply: fallbackText });
    }

    // Call Gemini 3.8 Flash model
    const systemInstruction = 
      "Anda adalah 'Bantu AI DeLiangTerra', asisten pakar sains dan teknologi Energi Baru dan Terbarukan (EBT) masa depan. " +
      "Jawablah dengan ramah, edukatif, faktual, dan mendalam dalam Bahasa Indonesia. " +
      "Gunakan analogi yang mudah dipahami bila menjelaskan konsep rumit seperti perovskit, elektrolisis membran PEM, sel bahan bakar hidrogen, dan stabilitas jaringan 50 Hz. " +
      "Sertakan poin-poin terstruktur, rumus fisika/kimia bila relevan, dan saran praktis. " +
      "Format jawaban Anda dengan markdown bersih, rapi, dan nyaman dibaca.";

    const formattedContents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.text }],
          });
        }
      }
    }
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || getFallbackKnowledgeResponse(message);
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error?.message || error);
    // Return high quality educational fallback on any upstream API error
    const fallback = getFallbackKnowledgeResponse(req.body?.message || '');
    return res.json({ reply: fallback });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DeLiangTerra Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
