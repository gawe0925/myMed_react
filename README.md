# 💊 myMedication

> A patient-facing medication reference and personal list manager — built from real pharmacy floor experience.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🩺 About

myMedication was built after observing recurring patient confusion about prescription purposes on the pharmacy floor. Rather than a textbook exercise, this tool was shaped by direct feedback from patients and pharmacists in a real dispensary environment processing 300–600 prescriptions daily.

This project is a full-stack transition migrating from a static JSON-based prototype to a **Serverless Full-Stack React application**, leveraging **Firebase** for cloud persistence, user authentication, and secure data storage without the overhead of traditional server management.

---

## ✨ Features

* **🔍 Fuzzy Medication Search** — Instant reference results as you type.
* **📋 Custom Medication Lists** — Create and manage multiple personal lists seamlessly.
* **✏️ Inline List Renaming** — Click to rename a list, click away to instantly save.
* **📝 Personal Notes** — Add custom notes to individual medications within your lists.
* **🔐 User Authentication** — Secure signup and login via Firebase Auth to protect personal lists.
* **☁️ Serverless Cloud Sync** — Real-time persistent storage synced directly to Firebase Firestore (NoSQL).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, React Router, Context API, CSS Modules |
| **Backend / BaaS** | Firebase (Serverless Architecture) |
| **Database** | Firebase Firestore (NoSQL Cloud Database) |
| **Authentication** | Firebase Authentication |
| **CI/CD & Hosting**| GitHub Actions, Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone [https://github.com/gawe0925/myMed_react.git](https://github.com/gawe0925/myMed_react.git)
cd myMed_react

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
med_react/ (Project Root)
├── .github/workflows/    # CI/CD deployment pipelines
├── public/               # Static assets (Favicon, SVG icons)
├── src/
│   ├── assets/           # Images and media assets
│   ├── components/       # Reusable UI components
│   │   ├── ListItem.jsx
│   │   ├── MedList.jsx
│   │   ├── MedicationCard.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchBar.jsx
│   ├── context/          # Global state management
│   │   ├── AuthContext.jsx
│   │   └── MedContext.jsx
│   ├── css/              # Component stylesheets
│   │   └── ListPage.module.css
│   ├── data/             # Local fallbacks or static data
│   ├── pages/            # View components (Routes)
│   │   ├── ListPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SearchPage.jsx
│   ├── routes/           # Authentication guards
│   │   └── AuthGate.jsx
│   ├── App.css
│   ├── App.jsx           # Main application router
│   ├── firebase.js       # Firebase configuration & initialization
│   ├── index.css
│   └── main.jsx          # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── vercel.json           # Vercel SPA routing configurations
└── README.md
```

---

## 🗺️ Roadmap

- [x] Fuzzy medication search
- [x] Custom medication lists
- [x] Inline list renaming
- [x] Personal notes per medication
- [x] Firebase User Authentication (Sign up / Login)
- [x] Persistent Cloud Storage with Firestore (NoSQL)
- [x] CI/CD Pipeline via GitHub Actions & Vercel
- [x] Mobile responsive layout (RWD) optimizations
- [ ] Save / export list as PDF

---

## 👨‍💻 Author

**Mark Cheng**
Pharmacy Assistant turned Software Developer — building tools that solve real problems from the pharmacy floor.

[![GitHub](https://img.shields.io/badge/GitHub-gawe0925-181717?style=flat&logo=github)](https://github.com/gawe0925)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mark_Cheng-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/mark-cheng-b9175025b)

---

> *Built with real patients in mind. 💙*
