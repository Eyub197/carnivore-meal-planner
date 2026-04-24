# Carnivore Deal Finder

Built by [Eyub197](https://github.com/Eyub197)

I saw Mastra and something clicked — I had to build with it. This is the result: a tool that scrapes the Lidl Bulgaria weekly brochure, finds deals relevant to a carnivore diet, and generates a weekly meal plan based on your macro targets.

## What it does

1. Scrapes lidl.bg for the current week's brochure links
2. Downloads the PDFs using headless Playwright
3. Extracts text from the PDFs and passes it to an AI agent
4. The agent filters for carnivore-relevant deals (meats, eggs — no dairy, no breaded stuff)
5. A second agent takes those deals and builds a 7-day meal plan hitting ~1900 kcal/day, 185g protein, max 15g carbs
6. A minimal frontend serves the meal plan in the browser

## Technologies used

- **Mastra** — workflow orchestration and AI agent framework
- **Playwright** — headless browser automation for scraping and PDF downloading
- **pdf-parse** — PDF text extraction
- **Bun** — runtime, package manager, and HTTP server
- **Zod** — input/output schema validation across workflow steps
- **OpenAI / Google Gemini** — LLM backends for the agents

## What I learned

- How Mastra's input/output schemas chain between workflow steps — if a step returns `void`, the next step gets `undefined` and the whole thing breaks
- Playwright behaves differently in headless vs headed mode — PDF downloads trigger a `download` event in headless, but open a new tab in headed
- Passing file content directly in the prompt is far more reliable than letting the agent read files itself via tools
- `Promise.all` isn't just for parallelism — registering an event listener before triggering the action that fires it is a real pattern
- pre tag it preserves the whitespace and newlines formating of the text.

## Getting started

```sh
bun install
bun run dev        # starts Mastra at http://localhost:4111
bun src/server.ts  # starts the frontend at http://localhost:8080
```

Set `FOLDER_PATH` in your `.env` to the absolute path of `src/mastra/public/`.

## What's next

- Better frontend — right now it's a button and raw markdown
- Trigger the full pipeline from the UI instead of manually running workflows
