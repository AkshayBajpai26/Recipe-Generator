# ⚡ Smart Recipe Generator

> *Throw in your ingredients. Let AI do the cooking.*

No bloated cookbooks. No infinite scroll. Snap a pic (or type it), and get recipes based on what’s actually in your kitchen. Built with React + Vite, powered by multiple AI backends.

![Smart Recipe Generator](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple)
![AI Powered](https://img.shields.io/badge/AI-Powered-green)

---

## 🔥 Core Powers

* **Ingredient Input** → Type it or drop an image
* **Multi‑AI Detection** → OpenAI GPT‑4 Vision · Imagga · Hugging Face · Local TF.js (fallback)
* **Recipe Engine** → Matches dishes from your pantry
* **Nutrition** → Calories + macros
* **Filters** → Time, difficulty, cuisine, veg/vegan/gluten‑free

---

## 🖼️ How It Sees Your Food

1. Upload pic
2. AI detects ingredients (with confidence)
3. Low‑confidence noise gets filtered
4. Recipes ranked and served

---

## 🛠️ Stack

* ⚛️ React 19 + TypeScript
* ⚡ Vite 7 (fast builds)
* 🤖 AI: OpenAI · Imagga · Hugging Face
* 🧩 TensorFlow\.js (local fallback)

---

## 🚀 Run It

```bash
git clone https://github.com/yourusername/smart-recipe-gen.git
cd smart-recipe-gen
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## ⚙️ AI Setup

**OpenAI (GPT‑4 Vision)** — best accuracy
**Imagga** — prewired (≈1k free calls/month)
**Hugging Face** — bring your key

Add env vars:

```env
VITE_OPENAI_API_KEY=sk-...
VITE_IMAGGA_API_KEY=...
VITE_HUGGINGFACE_API_KEY=hf_...
```

In app → **🤖 AI Settings** → select provider.

---

## 🗂️ Project Skeleton

```
src/
 ├─ components/      # UI parts
 ├─ services/        # AI abstraction
 ├─ types.ts         # Shared types
 ├─ App.tsx          # Root
 └─ main.tsx         # Entry
```

---

## 🧠 Service Layer (snippet)

```ts
// src/services/aiService.ts
export type AIImageRecognitionResult = {
  items: { name: string; confidence: number }[]
}

export class AIService {
  constructor(private provider: 'openai'|'imagga'|'hf'|'local') {}

  async recognizeIngredients(file: File): Promise<AIImageRecognitionResult> {
    try {
      if (this.provider === 'local') return this.localDetect(file)
      return this.cloudDetect(file)
    } catch (e) {
      console.warn('AI fail → fallback to local', e)
      return this.localDetect(file)
    }
  }

  private async cloudDetect(file: File): Promise<AIImageRecognitionResult> {
    // pseudo‑switch; implement per provider
    switch (this.provider) {
      case 'openai':
        return this.detectWithOpenAI(file)
      case 'imagga':
        return this.detectWithImagga(file)
      case 'hf':
        return this.detectWithHF(file)
      default:
        return this.localDetect(file)
    }
  }

  private async detectWithOpenAI(file: File): Promise<AIImageRecognitionResult> {
    // TODO: call OpenAI Vision endpoint with form-data
    return { items: [{ name: 'tomato', confidence: 0.93 }] }
  }

  private async detectWithImagga(file: File): Promise<AIImageRecognitionResult> {
    // TODO: call Imagga tagging API
    return { items: [{ name: 'onion', confidence: 0.88 }] }
  }

  private async detectWithHF(file: File): Promise<AIImageRecognitionResult> {
    // TODO: call Hugging Face inference endpoint
    return { items: [{ name: 'potato', confidence: 0.85 }] }
  }

  private async localDetect(file: File): Promise<AIImageRecognitionResult> {
    // Simulated TF.js
    return { items: [{ name: 'capsicum', confidence: 0.7 }] }
  }
}
```

---

## 🧩 Recipe Match (concept)

* Score = % of ingredients you already have
* Demote low‑confidence detections
* Respect filters (time, difficulty, cuisine, dietary)
* Sort by: score → cook time → rating

```ts
// pseudo: match.ts
export function scoreRecipe(owned: string[], recipe: { ingredients: string[] }) {
  const got = recipe.ingredients.filter(i => owned.includes(i.toLowerCase()))
  return got.length / recipe.ingredients.length
}
```

---

## 🧪 Troubleshooting

* **Node error (Vite ≥ 7)** → use Node 20.19+ or 22.12+
* **API keys** → valid, quota ok, network ok
* **Image upload** → JPG/PNG/WebP ≤ 10MB, food visible

Enable debug:

```js
localStorage.setItem('debug', 'true')
```

---

## 🔮 Roadmap

* Shopping list generator
* Weekly meal planner
* Voice input
* PWA + offline
* Advanced dietary rules

---

## 🤝 Contribute

* Fork → Branch → PR
* TypeScript only
* Add loading & error states
* Tests for utilities + services

---

## ⚡ License

MIT — hack, fork, remix.

---

## 🙌 Thanks

OpenAI • Imagga • Hugging Face • React • Vite • TypeScript
