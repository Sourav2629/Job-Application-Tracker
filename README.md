# Job Application Tracker

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75FF?logo=googlegemini&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

A full-stack web application for tracking job applications, built with the **MERN stack** (MongoDB, Express, React, Node.js) and enhanced with an **AI-powered auto-fill** feature. Paste any job description and an LLM extracts the company, role, location, salary, and a summary for you — then you manage everything from a clean, responsive dashboard with secure user accounts.

---

## Live Demo

- **App:** _add your deployed frontend URL here_
- **API:** hosted on Render

> Tip: add a short GIF of the AI auto-fill in action here — it's the most impressive part of the project and makes a strong first impression.

---

## Screenshots

| Dashboard | Add / Edit Job | Job Details |
|-----------|----------------|-------------|
| ![Dashboard](https://github.com/user-attachments/assets/3d2f48c0-e398-42ee-b1cf-4c6fae69c116) | ![Form](https://github.com/user-attachments/assets/a38ae761-b27c-4005-bf97-bfb3429b6cf6) | ![Detail](https://github.com/user-attachments/assets/4d8d0952-5cb1-4746-af79-f9a3748555a2) |

> Note: these may show an earlier version of the UI — recapture them to show the current indigo design and the AI panel.

---

## Features

### AI-Powered Auto-Fill
- Paste a full job description and let **Google Gemini** extract structured details automatically.
- Fills in **5 fields** for you — company name, role, location, salary, and a short notes summary.
- Results merge into the standard form, so you can review and edit anything before saving — nothing is overwritten.

### Job Tracking
- Full **create, read, update, delete** (CRUD) for job applications, scoped to each user.
- **5 application statuses** — Applied, Interview, Offer, Accepted, Rejected — with a guided status-progression rule on the server that prevents accidental backward changes (e.g. moving "Offer" back to "Applied").
- Track company, role, location, salary, applied date, and notes for every application.

### Dashboard
- See all applications at a glance with live stats (total, applied, interviews, offers, active).
- **Filter** by status, **sort** by date, and **search** by company or role.
- Each card shows status as a colored pill and how many days have passed since you applied.

### Secure Authentication
- Register and log in with **JWT-based** authentication.
- Passwords hashed with **bcrypt**; JWT signing secret loaded from environment variables (never hardcoded).
- Protected routes ensure users can only access their own data.

### Modern UI
- Responsive, component-based React interface with a custom design system (indigo/slate palette, reusable cards, status pills, and inputs with focus states).
- Toast notifications for instant feedback on every action.

---

## Tech Stack

**Backend**
- Node.js + Express — REST API
- MongoDB + Mongoose — database & modeling
- JSON Web Tokens (JWT) — authentication
- bcryptjs — password hashing
- Axios — calls to the Gemini API
- dotenv, cors

**Frontend**
- React 18 + React Router 6
- Context API + `useReducer` — state management
- React Toastify — notifications
- react-icons — iconography
- Webpack 5 + Babel — bundling
- Custom CSS design system

**AI**
- Google Gemini API (free tier, `gemini-2.5-flash-lite`)

---

## Project Structure

```
Job-Application-Tracker/
├── backend/
│   ├── server.js                  # Express entry: env loading, middleware, route mounting
│   └── src/
│       ├── controllers/
│       │   ├── auth.js            # Register, login, current user
│       │   ├── jobs.js            # Job CRUD + status-progression rule
│       │   └── ai.js              # Gemini-powered job-description parser
│       ├── middleware/
│       │   └── auth.js            # JWT verification (route protection)
│       ├── models/
│       │   ├── User.js            # User schema, password hashing, JWT signing
│       │   └── Job.js             # Job schema
│       └── routes/
│           ├── auth.js
│           ├── jobs.js
│           └── ai.js
└── frontend/
    ├── webpack.config.js
    └── src/
        ├── App.js                 # Routes + context providers
        ├── App.css                # Base styles
        ├── styles/
        │   └── theme-upgrade.css  # Professional design-system layer
        ├── components/
        │   ├── jobs/JobItem.js
        │   ├── layout/Navbar.js
        │   ├── layout/Spinner.js
        │   └── routing/PrivateRoute.js
        ├── context/
        │   ├── auth/              # Auth state, reducer, context
        │   ├── job/               # Job state, reducer, context
        │   └── alert/             # Alert state
        ├── pages/
        │   ├── Home.js            # Landing page
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Dashboard.js       # Job list, filters, search, stats
        │   ├── JobForm.js         # Add/edit job + AI auto-fill
        │   └── JobDetail.js
        └── utils/
            ├── api.js             # Axios instance
            └── setAuthToken.js
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| GET | `/api/auth/me` | Private | Get the current user's profile |

### Jobs
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/jobs` | Private | Get all jobs for the logged-in user |
| GET | `/api/jobs/:id` | Private | Get a single job |
| POST | `/api/jobs` | Private | Create a new job |
| PUT | `/api/jobs/:id` | Private | Update a job (enforces status progression) |
| DELETE | `/api/jobs/:id` | Private | Delete a job |

### AI
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/ai/parse-job` | Private | Parse a pasted job description into structured fields |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local install or MongoDB Atlas)
- A free Google Gemini API key (for the AI feature) — get one at [Google AI Studio](https://aistudio.google.com/) → **Get API key** (no credit card required)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Job-Application-Tracker
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the **backend** directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=a_long_random_string_at_least_32_characters
JWT_EXPIRE=30d
GEMINI_API_KEY=your_key_from_google_ai_studio
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the backend runs on |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWTs — use a long random string |
| `JWT_EXPIRE` | Token expiry duration (e.g. `30d`) |
| `GEMINI_API_KEY` | Google AI Studio API key, required for the AI auto-fill feature |

> Generate a strong `JWT_SECRET` quickly:
> ```bash
> node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
> ```

### Running the Application

1. **Start the backend** (from `backend/`)
   ```bash
   npm run dev
   ```
   The API runs on `http://localhost:5000`.

2. **Point the frontend at your local backend** — open `frontend/src/utils/api.js` and set:
   ```js
   baseURL: 'http://localhost:5000/api'
   ```
   (By default it points to the deployed backend. Change it to localhost to run everything locally.)

3. **Start the frontend** (from `frontend/`)
   ```bash
   npm start
   ```

4. Open **`http://localhost:3000`** in your browser.

> **Deploying?** Set the same environment variables (especially `JWT_SECRET` and `GEMINI_API_KEY`) in your hosting provider's dashboard (e.g. Render), or login and the AI feature won't work in production.

---

## How the AI Auto-Fill Works

1. On the **Add Job** page, paste a job posting into the AI panel and click **Auto-fill with AI**.
2. The frontend sends the description to the backend endpoint `POST /api/ai/parse-job` (protected by your login).
3. The backend calls the Gemini API with a prompt instructing it to return strict JSON, parses the response, and sends back the structured fields.
4. The form is populated with the extracted company, role, location, salary, and notes — ready for you to review, edit, and save.

The API key stays on the **server only** and is never exposed to the browser. The model name is a single constant in `backend/src/controllers/ai.js`, so it's easy to swap if Google updates its free model lineup.

---

## Roadmap

Ideas for future improvements:
- Additional AI tools — resume/job-description match score, cover-letter generator, interview-prep questions
- Analytics dashboard with a conversion funnel and applications-over-time charts
- Kanban board view with drag-and-drop by status
- Input validation and rate limiting
- Automated unit and integration tests

---

## License

This project is licensed under the MIT License.
