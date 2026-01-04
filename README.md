# 🔎 ResearchAI

**Intelligent AI-powered research platform for comprehensive web and local research.**

ResearchAI is an advanced research assistant that leverages AI to conduct thorough research on any topic, generating detailed reports with citations. Built with Next.js, TypeScript, FastAPI, LangChain, and Ollama.

## Features

- 🤖 **Multi-Agent Architecture**: Planner, execution, and publisher agents work together
- 🔍 **Web & Local Research**: Search the web or analyze local documents  
- 📝 **Detailed Reports**: Generate comprehensive reports with citations
- 🖼️ **Smart Image Curation**: Automatically find and include relevant images
- 📄 **Multiple Export Formats**: PDF, DOCX, and Markdown
- 💬 **Interactive Chat**: Ask questions about research results
- ⚡ **Real-time Updates**: WebSocket-based progress tracking
- 🎨 **Modern UI**: Responsive Next.js frontend with Tailwind CSS

## Architecture

The system uses a multi-agent approach:
1. **Planner Agent**: Generates research questions
2. **Execution Agents**: Gather information from multiple sources
3. **Publisher Agent**: Aggregates findings into comprehensive reports
4. **Context Manager**: Maintains research context and memory

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python 3.11+
- **AI/ML**: LangChain, LangGraph, Ollama (local LLM)
- **Search**: Tavily API
- **Real-time**: WebSockets
- **Architecture**: Multi-agent system with planner, executor, and publisher agents

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- Ollama installed ([download here](https://ollama.ai))

### Installation

1. **Install Ollama and pull models:**
   ```bash
   ollama pull llama3.2
   ollama pull mistral
   ollama pull nomic-embed-text
   ```

2. **Create `.env` file in project root:**
   ```bash
   OLLAMA_BASE_URL=http://localhost:11434
   FAST_LLM=ollama:llama3.2
   SMART_LLM=ollama:mistral
   STRATEGIC_LLM=ollama:llama3.2
   EMBEDDING=ollama:nomic-embed-text
   TAVILY_API_KEY=your_tavily_key_here
   RETRIEVER=tavily
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Install frontend dependencies:**
   ```bash
   cd frontend/nextjs
   npm install
   ```

5. **Start the backend:**
   ```bash
   python -m uvicorn main:app --reload
   ```

6. **Start the frontend (in another terminal):**
   ```bash
   cd frontend/nextjs
   npm run dev
   ```

7. **Visit** `http://localhost:3000`

## Usage

Simply enter a research query and the system will:
1. Generate research questions
2. Search multiple sources
3. Aggregate findings
4. Generate a comprehensive report with citations

You can also chat with the research results to ask follow-up questions.

## Project Structure

```
├── backend/          # FastAPI backend server
├── frontend/nextjs/  # Next.js frontend application
├── research_ai/      # Core research engine
├── multi_agents/     # Multi-agent system with LangGraph
└── main.py           # Application entry point
```

## License

MIT License
