<![CDATA[<div align="center">

# 🏦 FinAssist AI

### Your Intelligent Multi-Agent Financial Assistant

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4+-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*An AI-powered financial advisory platform built with a multi-agent orchestrator architecture, leveraging Google Gemini AI to provide personalized insights across banking, loans, investments, insurance, and budgeting.*

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Financial Tools](#-financial-tools)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**FinAssist AI** is an intelligent financial assistant that uses a **multi-agent architecture** to route user queries to specialized domain agents. An orchestrator agent powered by **Google Gemini AI** analyzes each user message, determines its financial category (banking, loans, investments, insurance, or budgeting), and delegates it to the appropriate specialist agent — each equipped with domain-specific tools and calculators.

The platform features a modern React frontend with a chat interface, dashboard analytics, conversation memory, and real-time agent status tracking.

---

## ✨ Features

### 🤖 Multi-Agent System
- **Orchestrator Agent** — Classifies user intent and routes to the correct specialist
- **Banking Agent** — Handles bank accounts, deposits, FD queries
- **Loan Agent** — Processes loan eligibility checks, EMI calculations
- **Investment Agent** — Provides SIP and investment advisory
- **Insurance Agent** — Addresses insurance-related queries
- **Budget Agent** — Analyzes spending and provides budgeting advice
- **Planner Agent** — Offers financial planning and goal-setting guidance

### 🛠️ Built-in Financial Calculators
- **EMI Calculator** — Compute monthly loan installments with principal, rate & tenure
- **FD Calculator** — Calculate fixed deposit maturity amounts with compound interest
- **Loan Eligibility Checker** — Assess loan eligibility based on income & existing obligations
- **Budget Analyzer** — Analyze income vs. expenses and generate savings recommendations

### 💬 Intelligent Chat Interface
- Real-time AI-powered chat with financial context
- Conversation memory that persists across sessions
- Agent status indicators showing which specialist is handling the query
- Chat history sidebar with session management
- Suggested prompts for common financial queries

### 🎨 Modern UI/UX
- Responsive React dashboard with animated backgrounds
- Landing page with hero section, category cards, and live chat preview
- Authentication pages (Login / Register)
- System status monitoring page
- Dark-themed financial dashboard with statistics

### 🔐 Privacy & Data Control
- Dedicated privacy endpoints to export or delete user data
- Conversation memory management with clear/export capabilities

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend (React + Vite)            │
│  ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐  │
│  │   Home   │ │   Chat    │ │Dashboard │ │ Settings │  │
│  │   Page   │ │  Window   │ │   Page   │ │   Page   │  │
│  └──────────┘ └─────┬─────┘ └──────────┘ └──────────┘  │
│                     │                                   │
│              chatApi / chatService                      │
└─────────────────────┼───────────────────────────────────┘
                      │ HTTP (POST /api/chat)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                 Backend (Node.js + Express)              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Orchestrator Agent                   │   │
│  │    (Gemini AI intent classification + routing)    │   │
│  └──────┬──────┬──────┬──────┬──────┬──────┬────────┘   │
│         │      │      │      │      │      │            │
│         ▼      ▼      ▼      ▼      ▼      ▼            │
│  ┌──────┐┌─────┐┌────┐┌─────┐┌────┐┌───────┐           │
│  │Bank- ││Loan ││Inv-││Insur││Bud-││Plann- │           │
│  │ing   ││Agent││est-││ance ││get ││er     │           │
│  │Agent ││     ││ment││Agent││Age-││Agent  │           │
│  │      ││     ││Age-││     ││nt  ││       │           │
│  │      ││     ││nt  ││     ││    ││       │           │
│  └──┬───┘└──┬──┘└──┬─┘└─────┘└─┬──┘└───────┘           │
│     │       │      │           │                        │
│     ▼       ▼      ▼           ▼                        │
│  ┌──────────────────────────────────┐                   │
│  │         Financial Tools          │                   │
│  │  EMI │ FD │ Loan Elig. │ Budget  │                   │
│  └──────────────────────────────────┘                   │
│                                                         │
│  ┌────────────────┐  ┌──────────────────┐               │
│  │ Gemini Service │  │   UPL AI Service │               │
│  │ (Google AI SDK)│  │  (External API)  │               │
│  └────────────────┘  └──────────────────┘               │
│                                                         │
│  ┌────────────────────────────────────┐                 │
│  │      Conversation Memory Store     │                 │
│  └────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────┘
```

### Agent Routing Flow

1. User sends a message through the chat interface
2. The **Orchestrator Agent** receives the message and calls **Gemini AI** to classify intent
3. Based on the classified category (`banking`, `loan`, `investment`, `insurance`, `budget`), the orchestrator delegates to the appropriate specialist agent
4. The specialist agent processes the query, optionally using **financial tools** (EMI calculator, FD calculator, etc.)
5. The response is returned through the orchestrator back to the user
6. The conversation is stored in the **Memory Store** for context continuity

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite 6** | Build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Lucide React** | Icon library |
| **Framer Motion** | Animations |
| **React Markdown** | Render AI responses in Markdown |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 4** | HTTP server framework |
| **Google Generative AI SDK** | Gemini AI integration |
| **Axios** | External API calls (UPL AI) |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |

---

## 📂 Project Structure

```
FinAssist-AI/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js                    # Express server entry point
│       ├── agents/
│       │   ├── orchestratorAgent.js     # Main routing agent (Gemini-powered)
│       │   ├── bankingAgent.js          # Banking domain specialist
│       │   ├── budgetAgent.js           # Budget analysis specialist
│       │   ├── insuranceAgent.js        # Insurance domain specialist
│       │   ├── investmentAgent.js       # Investment advisory specialist
│       │   ├── loanAgent.js             # Loan processing specialist
│       │   └── plannerAgent.js          # Financial planning specialist
│       ├── config/
│       │   └── env.js                   # Environment configuration
│       ├── controllers/
│       │   ├── chatController.js        # Chat endpoint handler
│       │   └── privacyController.js     # Privacy (export/delete) handler
│       ├── memory/
│       │   └── conversationMemory.js    # In-memory conversation store
│       ├── middleware/
│       │   └── errorHandler.js          # Global error handler
│       ├── routes/
│       │   ├── chatRoutes.js            # /api/chat routes
│       │   └── privacyRoutes.js         # /api/privacy routes
│       ├── services/
│       │   ├── agentService.js          # Agent registry & delegation
│       │   ├── aiService.js             # AI service abstraction
│       │   ├── geminiService.js         # Google Gemini AI integration
│       │   ├── toolService.js           # Financial tool executor
│       │   └── uplaiService.js          # UPL AI external API service
│       ├── tools/
│       │   ├── budgetAnalyzer.js        # Budget analysis calculator
│       │   ├── emiCalculator.js         # EMI calculation tool
│       │   ├── fdCalculator.js          # Fixed deposit calculator
│       │   ├── loanEligibility.js       # Loan eligibility checker
│       │   └── sipCalculator.js         # SIP calculator (placeholder)
│       └── workflows/
│           └── financialWorkflow.js     # Multi-step financial workflow
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── main.jsx                     # React entry point
│       ├── App.jsx                      # Root component with routing
│       ├── App.css                      # Global styles
│       ├── index.css                    # Base styles
│       ├── api/
│       │   └── chatApi.js               # Chat API client
│       ├── components/
│       │   ├── auth/
│       │   │   ├── AuthLayout.jsx       # Auth page layout
│       │   │   ├── LoginForm.jsx        # Login form component
│       │   │   └── SocialLogin.jsx      # Social login (placeholder)
│       │   ├── background/
│       │   │   └── AnimatedBackground.jsx  # Animated BG effect
│       │   ├── chat/
│       │   │   ├── AgentStatus.jsx      # Active agent indicator
│       │   │   ├── ChatArea.jsx         # Chat message area
│       │   │   ├── ChatHeader.jsx       # Chat window header
│       │   │   ├── ChatInput.jsx        # Message input component
│       │   │   ├── ChatLayout.jsx       # Chat page layout
│       │   │   ├── ChatMessages.jsx     # Message list renderer
│       │   │   ├── ChatSidebar.jsx      # Chat history sidebar
│       │   │   ├── ChatWindow.jsx       # Main chat container
│       │   │   ├── MemoryPanel.jsx      # Conversation memory panel
│       │   │   ├── MessageBubble.jsx    # Individual message bubble
│       │   │   ├── SuggestedPrompts.jsx # Prompt suggestions (placeholder)
│       │   │   └── TypingIndicator.jsx  # Typing animation (placeholder)
│       │   ├── common/
│       │   │   ├── Button.jsx           # Reusable button (placeholder)
│       │   │   ├── Card.jsx             # Reusable card (placeholder)
│       │   │   ├── Loader.jsx           # Loading spinner (placeholder)
│       │   │   └── Logo.jsx             # Logo component (placeholder)
│       │   ├── dashboard/
│       │   │   ├── Header.jsx           # Dashboard header (placeholder)
│       │   │   ├── QuickActions.jsx     # Quick action buttons
│       │   │   ├── RecentChats.jsx      # Recent chats (placeholder)
│       │   │   ├── Servicecard.jsx      # Service card component
│       │   │   ├── Sidebar.jsx          # Dashboard sidebar nav
│       │   │   ├── StatCard.jsx         # Statistics card
│       │   │   ├── Statistics.jsx       # Dashboard stats section
│       │   │   └── WelcomeCard.jsx      # Welcome greeting card
│       │   ├── home/
│       │   │   ├── Categories.jsx       # Financial category cards
│       │   │   ├── CategoryCard.jsx     # Individual category card
│       │   │   ├── ChatPreview.jsx      # Live chat demo preview
│       │   │   ├── CTA.jsx             # Call to action (placeholder)
│       │   │   ├── Features.jsx         # Features section (placeholder)
│       │   │   └── Hero.jsx             # Landing page hero section
│       │   └── layout/
│       │       ├── Container.jsx        # Layout container (placeholder)
│       │       ├── Footer.jsx           # Footer (placeholder)
│       │       └── Navbar.jsx           # Navigation bar
│       ├── data/
│       │   └── bankingCategories.js     # Banking category data
│       ├── pages/
│       │   ├── Chat.jsx                 # Chat page
│       │   ├── Dashboard.jsx            # Dashboard page
│       │   ├── Home.jsx                 # Landing page
│       │   ├── Login.jsx                # Login page
│       │   ├── NotFound.jsx             # 404 page
│       │   ├── Register.jsx             # Registration page
│       │   ├── Settings.jsx             # Settings page
│       │   └── SystemStatus.jsx         # System health monitor
│       └── services/
│           ├── chatService.js           # Chat service layer
│           └── memoryService.js         # Memory API service
│
├── .gitignore
├── package.json                         # Root package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/app/apikey)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/BandiHarshadha/FinAssist-AI.git
cd FinAssist-AI
```

**2. Install backend dependencies**
```bash
cd backend
npm install
```

**3. Install frontend dependencies**
```bash
cd ../frontend
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `backend/` directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

### Running the Application

**Start the backend server:**
```bash
cd backend
npm start
```
The backend will start on `http://localhost:3000`

**Start the frontend dev server (in a new terminal):**
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173`

---

## 🔐 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ | Your Google Gemini API key for AI-powered responses |
| `PORT` | ❌ | Backend server port (default: `3000`) |

---

## 📡 API Reference

### Chat

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Send a message and receive AI-powered financial advice |

**Request Body:**
```json
{
  "message": "What is the EMI for a ₹10 lakh loan at 8.5% for 20 years?",
  "userId": "user123"
}
```

**Response:**
```json
{
  "reply": "Based on the EMI calculation...",
  "agent": "loan",
  "tool_used": "emi_calculator"
}
```

### Privacy

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/privacy/export/:userId` | Export all conversation data for a user |
| `DELETE` | `/api/privacy/delete/:userId` | Delete all stored data for a user |

---

## 🧮 Financial Tools

### EMI Calculator
Calculates Equated Monthly Installments using the standard formula:

$$EMI = P \times \frac{r(1+r)^n}{(1+r)^n - 1}$$

Where: **P** = Principal, **r** = Monthly interest rate, **n** = Tenure in months

### FD Calculator
Computes Fixed Deposit maturity amount using compound interest:

$$A = P \times \left(1 + \frac{r}{n}\right)^{n \times t}$$

Where: **P** = Principal, **r** = Annual rate, **n** = Compounding frequency, **t** = Time in years

### Loan Eligibility Checker
Evaluates loan eligibility based on:
- Monthly income
- Existing EMI obligations
- Debt-to-income ratio threshold (50%)

### Budget Analyzer
Analyzes financial health by:
- Calculating total expenses vs. income
- Computing savings rate
- Providing categorized spending breakdown
- Generating actionable recommendations

---

## 🗺 Roadmap

- [x] Multi-agent architecture with orchestrator
- [x] Google Gemini AI integration
- [x] EMI, FD, and loan eligibility calculators
- [x] Budget analyzer tool
- [x] Chat interface with conversation memory
- [x] Agent status tracking in UI
- [x] Privacy controls (export/delete data)
- [ ] SIP calculator implementation
- [ ] User authentication with JWT
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Social login (Google, GitHub)
- [ ] Voice input for chat
- [ ] Export chat as PDF
- [ ] Real-time market data integration
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please make sure to:
- Follow the existing code style
- Write meaningful commit messages
- Update documentation for any new features

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Bandi Harshadha](https://github.com/BandiHarshadha)**

⭐ Star this repo if you found it helpful!

</div>
]]>
