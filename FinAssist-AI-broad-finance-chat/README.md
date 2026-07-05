 # 🏦 FinAssist AI

### Your Intelligent Multi-Agent Financial Assistant

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6+-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Express](https://img.shields.io/badge/Express-4+-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge\&logo=google\&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-Agentic%20Workflow-purple?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

> An AI-powered financial advisory platform built with a multi-agent orchestrator architecture, leveraging Google Gemini AI, memory-based personalization, financial tools, and LangGraph workflow execution to provide intelligent financial guidance across banking, loans, investments, insurance, budgeting, goal planning, and financial health analysis.

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Advanced Features Added](#-advanced-features-added)
* [Features](#-features)
* [Architecture](#-architecture)
* [Agent Workflow](#-agent-workflow)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [API Reference](#-api-reference)
* [Financial Tools](#-financial-tools)
* [Demo Prompts](#-demo-prompts)
* [Roadmap](#-roadmap)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🔍 Overview

**FinAssist AI** is an intelligent multi-agent financial assistant designed to help users with banking, budgeting, loans, investments, insurance, financial goals, and personalized financial planning.

The project is not just a simple chatbot. It uses an **agentic AI architecture**, where multiple specialized agents work together to understand the user query, remember financial information, analyze budget, calculate savings, estimate goal timelines, generate financial health scores, and produce a complete financial plan.

The system includes:

* React + Vite frontend
* Node.js + Express backend
* FinAssist Brain for smart routing
* Memory Agent for storing user financial profile
* Budget Agent for savings calculation
* Goal Planning Agent
* Financial Health Score Agent
* Multi-Agent Orchestrator
* LangGraph-based workflow
* Agent execution timeline in UI
* Memory dashboard panel
* Financial tools such as EMI, FD, loan eligibility, SIP, and budget analysis

---

## 🚀 Advanced Features Added

### 1. 🧠 Memory Agent

The Memory Agent stores important user financial details and uses them later for personalized responses.

It remembers:

* User name
* Monthly income
* Monthly expenses
* EMI obligations
* Financial goal
* Target savings amount

Example input:

```text
My name is Rahul. My income is 75000. My expenses are 25000. EMI is 15000. I want to save 1000000 for a house.
```

Stored memory:

```json
{
  "name": "Rahul",
  "income": 75000,
  "expenses": 25000,
  "emi": 15000,
  "goal": "House",
  "targetAmount": 1000000
}
```

This allows the assistant to answer future questions without asking the user to repeat details.

---

### 2. 🧠 FinAssist Brain

FinAssist Brain is the central intelligence layer of the project.

It decides what to do based on the user message.

It can route messages to:

* Memory Agent
* Budget Agent
* Goal Planning Agent
* Financial Health Agent
* Loan Agent
* Investment Agent
* Multi-Agent Orchestrator
* LangGraph Workflow

Example:

```text
User: How much can I save monthly?
```

FinAssist Brain understands that this is a savings question and routes it to:

```text
Budget Agent + Memory Agent
```

---

### 3. 💰 Budget Agent

The Budget Agent calculates monthly savings using remembered financial data.

Formula:

```text
Monthly Savings = Income - Expenses - EMI
```

Example:

```text
Income: ₹75,000
Expenses: ₹25,000
EMI: ₹15,000
```

Output:

```text
Monthly Savings: ₹35,000
```

---

### 4. 🎯 Goal Planning Agent

The Goal Planning Agent helps users understand how long it will take to reach a target financial goal.

Example:

```text
Target Amount: ₹10,00,000
Monthly Savings: ₹35,000
```

Calculation:

```text
Months Required = Target Amount / Monthly Savings
```

Output:

```text
To reach ₹10,00,000, with monthly savings of ₹35,000, you need around 29 months, which is approximately 2.4 years.
```

This is useful for goals such as:

* House down payment
* Car purchase
* Emergency fund
* Business fund
* Education fund
* Retirement fund

---

### 5. 📊 Financial Health Score Agent

The Financial Health Agent generates a score based on the user's income, expenses, EMI, and savings capacity.

It considers:

* Savings rate
* Debt ratio
* EMI burden
* Monthly disposable income

Score categories:

```text
0 - 40     Poor
40 - 60    Average
60 - 80    Good
80 - 100   Excellent
```

Example output:

```text
Financial Health Score: 100/100 (Excellent)
Monthly Savings: ₹35,000
Savings Rate: 46.7%
Debt Ratio: 20.0%
```

---

### 6. 🤖 Multi-Agent Orchestrator

The Multi-Agent Orchestrator runs multiple agents together and produces a complete financial summary.

Workflow:

```text
User Query
   ↓
Memory Agent
   ↓
Budget Agent
   ↓
Goal Planning Agent
   ↓
Financial Health Agent
   ↓
Final Recommendation
```

Example prompt:

```text
Give me a complete financial plan
```

Output includes:

* Agents executed
* Monthly income
* Monthly expenses
* EMI
* Monthly savings
* Goal plan
* Health score
* Final recommendation

---

### 7. 🔗 LangGraph Multi-Agent Workflow

LangGraph is used to create a structured agent workflow.

Workflow nodes:

```text
Memory Node
   ↓
Budget Node
   ↓
Goal Planning Node
   ↓
Health Score Node
   ↓
Final Planner Node
```

This makes the project more advanced because it shows stateful agent execution instead of a single direct chatbot response.

Example prompt:

```text
Run LangGraph advanced plan
```

Output:

```text
LangGraph Multi-Agent Workflow Executed:

✅ Memory Agent
✅ Budget Agent
✅ Goal Planning Agent
✅ Financial Health Agent

Financial Summary:
Income: ₹75000
Expenses: ₹25000
EMI: ₹15000
Savings: ₹35000

Goal Plan:
...

Health Score:
...

Final Recommendation:
...
```

---

### 8. 🖥️ Frontend Agent Execution Timeline

The frontend displays an agent execution timeline when the Multi-Agent Orchestrator runs.

Example UI:

```text
Agent Execution Timeline

✅ Memory Agent
✅ Budget Agent
✅ Goal Planning Agent
✅ Financial Health Agent
```

This makes the application look like a real AI agent system.

---

### 9. 🧠 Memory Panel UI

The frontend includes a Memory Agent panel that displays stored financial information.

It shows:

* Name
* Income
* Expenses
* EMI
* Goal
* Target amount

It also includes:

* Refresh Memory button
* Reset Memory button

This allows users to visually confirm that the assistant is remembering their financial profile.

---

### 10. 💬 User-Friendly Chat Experience

The chat interface supports natural user messages such as:

```text
My income is 75000 and expenses are 25000
```

```text
How much can I save monthly?
```

```text
How long will it take to reach my goal?
```

```text
What is my financial health score?
```

```text
Give me a complete financial plan
```

```text
Run LangGraph advanced plan
```

The user does not need to know technical commands. The system understands the intent and routes the query automatically.

---

## ✨ Features

### 🤖 Multi-Agent System

* **FinAssist Brain** — Central intelligent router for user queries
* **Memory Agent** — Stores and retrieves user financial profile
* **Orchestrator Agent** — Coordinates multiple agents together
* **Banking Agent** — Handles bank accounts, deposits, FD queries
* **Loan Agent** — Processes loan eligibility checks and EMI calculations
* **Investment Agent** — Provides SIP and investment advisory
* **Insurance Agent** — Handles insurance-related queries
* **Budget Agent** — Analyzes income, expenses, EMI, and savings
* **Goal Planning Agent** — Estimates time required to reach a target goal
* **Financial Health Agent** — Calculates financial health score
* **Planner Agent** — Provides complete financial recommendations
* **LangGraph Workflow** — Executes structured multi-agent workflows

---

### 🛠️ Built-in Financial Calculators

* **EMI Calculator** — Computes monthly loan installments
* **FD Calculator** — Calculates fixed deposit maturity amount
* **Loan Eligibility Checker** — Assesses loan eligibility
* **Budget Analyzer** — Analyzes income vs expenses
* **SIP Calculator** — Helps estimate investment growth
* **Savings Calculator** — Calculates monthly savings from memory
* **Goal Timeline Calculator** — Estimates time to reach target amount
* **Financial Health Score Calculator** — Scores user financial condition

---

### 💬 Intelligent Chat Interface

* Real-time AI-powered chat
* Agent name display
* Multi-agent response display
* Agent execution timeline
* Conversation memory
* Memory panel
* Suggested prompts
* Error handling for backend connection
* User-friendly financial planning responses

---

### 🎨 Modern UI/UX

* Responsive React frontend
* Dark-themed financial dashboard
* Chat page
* Dashboard page
* Landing page
* Authentication pages
* Agent status badges
* Memory dashboard
* Agent timeline card
* Clean financial assistant interface

---

### 🔐 Privacy & Data Control

* Memory reset endpoint
* Privacy routes
* Prompt injection guard middleware
* User data control
* Backend safety middleware
* UPLAI privacy integration support

---

## 🏗 Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                  Frontend: React + Vite                 │
│                                                         │
│  Home Page · Dashboard · Chat Page · Memory Panel       │
│                                                         │
│  ChatWindow                                             │
│  Agent Execution Timeline                               │
│  Memory Agent Panel                                     │
│  chatService.js                                         │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ HTTP Request
                       │ POST /api/chat
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Backend: Node.js + Express                 │
│                                                         │
│  chatController.js                                      │
│        ↓                                                │
│  FinAssist Brain                                        │
│        ↓                                                │
│  Intent Routing + Memory Access                         │
│        ↓                                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Multi-Agent System                    │  │
│  │                                                   │  │
│  │  Memory Agent                                     │  │
│  │  Budget Agent                                     │  │
│  │  Goal Planning Agent                              │  │
│  │  Financial Health Agent                           │  │
│  │  Loan Agent                                       │  │
│  │  Investment Agent                                 │  │
│  │  Insurance Agent                                  │  │
│  │  Planner Agent                                    │  │
│  │  Orchestrator Agent                               │  │
│  └───────────────────────────────────────────────────┘  │
│        ↓                                                │
│  LangGraph Workflow                                     │
│        ↓                                                │
│  Final Financial Recommendation                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Agent Workflow

### Normal Chat Flow

```text
User Message
   ↓
Chat Controller
   ↓
FinAssist Brain
   ↓
Intent Detection
   ↓
Selected Agent
   ↓
Final Response
```

---

### Memory Flow

```text
User gives income, expenses, EMI, or goal
   ↓
FinAssist Brain detects financial profile data
   ↓
Memory Agent stores details
   ↓
Future responses use remembered data
```

---

### Complete Financial Plan Flow

```text
User: Give me a complete financial plan
   ↓
Multi-Agent Orchestrator
   ↓
Memory Agent
   ↓
Budget Agent
   ↓
Goal Planning Agent
   ↓
Financial Health Agent
   ↓
Final Planner Recommendation
```

---

### LangGraph Workflow

```text
User: Run LangGraph advanced plan
   ↓
LangGraph StateGraph
   ↓
Memory Node
   ↓
Budget Node
   ↓
Goal Node
   ↓
Health Node
   ↓
Final Node
   ↓
Structured Multi-Agent Output
```

---

## 🛠 Tech Stack

### Frontend

| Technology           | Purpose                           |
| -------------------- | --------------------------------- |
| **React 18**         | Frontend UI                       |
| **Vite 6**           | Development server and build tool |
| **React Router DOM** | Page routing                      |
| **Axios**            | API requests                      |
| **Tailwind CSS**     | Styling                           |
| **Lucide React**     | Icons                             |
| **Framer Motion**    | Animations                        |
| **React Markdown**   | Markdown rendering                |

---

### Backend

| Technology           | Purpose                            |
| -------------------- | ---------------------------------- |
| **Node.js**          | Backend runtime                    |
| **Express.js**       | REST API server                    |
| **Google Gemini AI** | AI-powered financial responses     |
| **LangGraph**        | Multi-agent workflow orchestration |
| **LangChain Core**   | Agent workflow support             |
| **CORS**             | Frontend-backend connection        |
| **dotenv**           | Environment variable management    |
| **Axios**            | External API communication         |
| **Nodemon**          | Development auto-restart           |

---

## 📂 Project Structure

```text
FinAssist-AI/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── agents/
│       │   ├── finAssistBrain.js
│       │   ├── orchestratorAgent.js
│       │   ├── bankingAgent.js
│       │   ├── budgetAgent.js
│       │   ├── insuranceAgent.js
│       │   ├── investmentAgent.js
│       │   ├── loanAgent.js
│       │   ├── plannerAgent.js
│       │   ├── goalPlanningAgent.js
│       │   └── financialHealthAgent.js
│       ├── config/
│       │   └── env.js
│       ├── controllers/
│       │   ├── chatController.js
│       │   └── privacyController.js
│       ├── memory/
│       │   ├── conversationMemory.js
│       │   └── userProfileMemory.js
│       ├── middleware/
│       │   ├── errorHandler.js
│       │   └── promptInjectionGuard.js
│       ├── routes/
│       │   ├── chatRoutes.js
│       │   └── privacyRoutes.js
│       ├── services/
│       │   ├── agentService.js
│       │   ├── aiService.js
│       │   ├── geminiService.js
│       │   ├── toolService.js
│       │   └── uplaiService.js
│       ├── tools/
│       │   ├── budgetAnalyzer.js
│       │   ├── emiCalculator.js
│       │   ├── fdCalculator.js
│       │   ├── loanEligibility.js
│       │   └── sipCalculator.js
│       └── workflows/
│           ├── financialWorkflow.js
│           └── langgraphFinancialWorkflow.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── api/
│       │   └── chatApi.js
│       ├── components/
│       │   ├── auth/
│       │   ├── background/
│       │   ├── chat/
│       │   │   ├── ChatArea.jsx
│       │   │   ├── ChatHeader.jsx
│       │   │   ├── ChatInput.jsx
│       │   │   ├── ChatLayout.jsx
│       │   │   ├── ChatMessages.jsx
│       │   │   ├── ChatSidebar.jsx
│       │   │   ├── ChatWindow.jsx
│       │   │   ├── MessageBubble.jsx
│       │   │   ├── MemoryPanel.jsx
│       │   │   ├── AgentStatus.jsx
│       │   │   ├── AgentExecutionPanel.jsx
│       │   │   └── TypingIndicator.jsx
│       │   ├── common/
│       │   ├── dashboard/
│       │   ├── home/
│       │   └── layout/
│       ├── data/
│       │   └── bankingCategories.js
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Chat.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Settings.jsx
│       │   ├── SystemStatus.jsx
│       │   └── NotFound.jsx
│       └── services/
│           ├── chatService.js
│           └── memoryService.js
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js >= 18
* npm >= 9
* Google Gemini API Key
* VS Code recommended

---

### 1. Clone the Repository

```bash
git clone https://github.com/BandiHarshadha/FinAssist-AI.git
cd FinAssist-AI
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

### 4. Configure Environment Variables

Create a `.env` file inside the `backend/` folder.

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5001
```

---

### 5. Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:5001
```

---

### 6. Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

| Variable         | Required | Description                        |
| ---------------- | -------- | ---------------------------------- |
| `GEMINI_API_KEY` | Yes      | Google Gemini API key              |
| `PORT`           | No       | Backend port, default used is 5001 |

---

## 📡 API Reference

### Health Check

| Method | Endpoint | Description                       |
| ------ | -------- | --------------------------------- |
| GET    | `/`      | Checks whether backend is running |

Example response:

```json
{
  "message": "FinAssist AI Backend is Running 🚀",
  "status": "success",
  "version": "1.0.0"
}
```

---

### Chat API

| Method | Endpoint    | Description                             |
| ------ | ----------- | --------------------------------------- |
| POST   | `/api/chat` | Sends a user message to FinAssist Brain |

Request:

```json
{
  "message": "Give me a complete financial plan"
}
```

Response:

```json
{
  "success": true,
  "agent": "Multi-Agent Orchestrator",
  "reply": "Agents Executed..."
}
```

---

### Memory API

| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| GET    | `/api/chat/memory` | Returns stored user memory |
| DELETE | `/api/chat/memory` | Resets stored memory       |

Example memory response:

```json
{
  "success": true,
  "memory": {
    "name": "Rahul",
    "income": 75000,
    "expenses": 25000,
    "emi": 15000,
    "goal": "House",
    "targetAmount": 1000000
  }
}
```

---

### Privacy API

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | `/api/privacy/export/:userId` | Export stored user data |
| DELETE | `/api/privacy/delete/:userId` | Delete stored user data |

---

## 🧮 Financial Tools

### EMI Calculator

Calculates Equated Monthly Installment.

Formula:

```text
EMI = P × r × (1+r)^n / ((1+r)^n - 1)
```

Where:

* P = Principal amount
* r = Monthly interest rate
* n = Loan tenure in months

---

### FD Calculator

Calculates Fixed Deposit maturity amount.

Formula:

```text
A = P × (1 + r/n)^(n × t)
```

Where:

* P = Principal
* r = Annual interest rate
* n = Compounding frequency
* t = Time in years

---

### Loan Eligibility Checker

Checks eligibility using:

* Monthly income
* Existing EMI
* Debt-to-income ratio
* Repayment capacity

---

### Budget Analyzer

Analyzes:

* Income
* Expenses
* Savings
* EMI
* Savings rate
* Financial stability

---

### SIP Calculator

Estimates future investment value using monthly SIP amount, expected return, and investment duration.

---

## 🧪 Demo Prompts

Use these in the frontend chat page:

```text
My name is Rahul. My income is 75000. My expenses are 25000. EMI is 15000. I want to save 1000000 for a house.
```

```text
How much can I save monthly?
```

```text
How long will it take to reach my goal?
```

```text
What is my financial health score?
```

```text
Give me a complete financial plan
```

```text
Run LangGraph advanced plan
```

---

## ✅ What We Added Recently

The latest version of FinAssist AI includes:

* Memory Agent
* User Profile Memory Store
* FinAssist Brain
* Budget Agent integration with memory
* Goal Planning Agent
* Financial Health Score Agent
* Multi-Agent Orchestrator
* LangGraph Financial Workflow
* Agent Execution Timeline
* Memory Panel UI
* Frontend chat integration
* Backend chat memory API
* Reset memory feature
* Prompt injection guard fix
* User-friendly demo prompts
* Improved README documentation

---

## 🧪 Example Full Demo Flow

### Step 1: Save user memory

User enters:

```text
My name is Rahul. My income is 75000. My expenses are 25000. EMI is 15000. I want to save 1000000 for a house.
```

System response:

```text
Memory Agent

I have saved your financial details. I will use this memory to give personalized financial advice.
```

---

### Step 2: Ask monthly savings

User enters:

```text
How much can I save monthly?
```

System response:

```text
Budget Agent + Memory Agent

Based on your remembered profile, you can save ₹35000 per month.
```

---

### Step 3: Ask goal timeline

User enters:

```text
How long will it take to reach my goal?
```

System response:

```text
Goal Planning Agent + Memory Agent

To reach ₹1000000, with monthly savings of ₹35000, you need around 29 months (2.4 years).
```

---

### Step 4: Ask financial health score

User enters:

```text
What is my financial health score?
```

System response:

```text
Financial Health Agent + Memory Agent

Financial Health Score: 100/100 (Excellent).
Monthly savings: ₹35000.
Savings rate: 46.7%.
Debt ratio: 20.0%.
```

---

### Step 5: Ask complete financial plan

User enters:

```text
Give me a complete financial plan
```

System response:

```text
Multi-Agent Orchestrator

Agents Executed:
✓ Memory Agent
✓ Budget Agent
✓ Goal Planning Agent
✓ Financial Health Agent

Final Financial Summary:
Monthly Income: ₹75000
Monthly Expenses: ₹25000
Monthly EMI: ₹15000
Monthly Savings: ₹35000

Goal Plan:
To reach ₹1000000, with monthly savings of ₹35000, you need around 29 months (2.4 years).

Health Score:
Financial Health Score: 100/100 (Excellent).

Final Recommendation:
You can save ₹35000 per month. Use part of this amount for your goal and keep some amount for emergency savings.
```

---

### Step 6: Run LangGraph workflow

User enters:

```text
Run LangGraph advanced plan
```

System response:

```text
LangGraph Multi-Agent Workflow

LangGraph Multi-Agent Workflow Executed:

✅ Memory Agent
✅ Budget Agent
✅ Goal Planning Agent
✅ Financial Health Agent

Financial Summary:
Income: ₹75000
Expenses: ₹25000
EMI: ₹15000
Savings: ₹35000

Goal Plan:
...

Health Score:
...

Final Recommendation:
Based on your profile, continue saving regularly and allocate part of your savings toward your financial goal.
```

---

## 🔒 Contribution Policy

This project is currently maintained only by the author.

External contributions are not being accepted at this time.

You may:
- View the project
- Learn from the code
- Star the repository
- Fork it for personal learning

You may not:
- Directly modify the main project
- Submit changes without permission
- Use the project for commercial purposes without approval

For any suggestions or queries, please contact the author.

---

## 👩‍💻 Author

**Built with ❤️ by [Bandi Harshadha](https://github.com/BandiHarshadha)**

---

⭐ Star this repo if you found it helpful!