# 💊 myMedication

> A patient-facing medication reference and personal list manager — built from real pharmacy floor experience.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🩺 About

**myMedication** was built after observing recurring patient confusion about prescription purposes on the pharmacy floor. Rather than a textbook exercise, this tool was shaped by direct feedback from patients and pharmacists in a real dispensary environment processing 300–600 prescriptions daily.

This is a full rebuild of the original project — migrating from a static JSON-based frontend to a full-stack React + Django REST Framework application with user authentication and persistent storage.

---

## ✨ Features

- 🔍 **Fuzzy medication search** — instant results as you type
- 📋 **Custom medication lists** — create and manage multiple personal lists
- ✏️ **Inline list renaming** — click to rename, click away to save
- 📝 **Personal notes** — add notes to individual medications
- 🔐 **User authentication** — save your lists across sessions *(in progress)*
- ☁️ **Cloud sync** — persist lists to Django backend *(in progress)*

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, React Router, Context API |
| Backend | Django, Django REST Framework *(in progress)* |
| Database | PostgreSQL *(in progress)* |
| Auth | JWT Token Authentication *(in progress)* |
| CI/CD | GitHub Actions |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/gawe0925/myMed_react.git
cd myMed_react

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── LoginPage.jsx
│   ├── SearchPage.jsx
│   └── MainPage.jsx
├── components/
│   ├── MedicationCard.jsx
│   └── ...
├── context/
│   └── MedContext.jsx
├── data/
│   └── medications.json
└── css/
    └── MainPage.css
```

---

## 🗺️ Roadmap

- [x] Fuzzy medication search
- [x] Custom medication lists
- [x] Inline list renaming
- [x] Personal notes per medication
- [x] CI pipeline via GitHub Actions
- [ ] Django REST API backend
- [ ] User authentication (JWT)
- [ ] Persist lists to database
- [ ] Save / export list as PDF
- [ ] Mobile responsive layout

---

## 👨‍💻 Author

**Mark Cheng**
Pharmacy Assistant turned Software Developer — building tools that solve real problems from the pharmacy floor.

[![GitHub](https://img.shields.io/badge/GitHub-gawe0925-181717?style=flat&logo=github)](https://github.com/gawe0925)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mark_Cheng-0077B5?style=flat&logo=linkedin)]([https://linkedin.com/in/your-linkedin](https://www.linkedin.com/in/mark-cheng-b9175025b/))

---

> *Built with real patients in mind. 💙*
