# NurseStudy — Open Access Nursing Study Hub

NurseStudy is a simple, modern, and accessible e-learning study hub built for nursing students to find concise topic summaries, key revision points, accredited open-access study materials, and structured study scheduling in one organized platform.

---

##  Idea One-Pager

* **Track:** Frontend Development
* **Stack:** React, Vite, JavaScript, CSS, Git, and GitHub
* **Hosting:** Vercel
* **Target User:** Nursing students seeking a centralized, distraction-free study and revision tool.

### Problem
Nursing students often spend valuable time searching across fragmented lecture notes, physical textbooks, and scattered web links. NurseStudy brings essential topics, concise key points, open-access references, and progress tracking together into one clean dashboard.

### Core Flow
Browse Nursing Subjects → Global Keyword Search or Category Filter → Review Key Points & Study Notes → Track Progress → Schedule Study Sessions.

### Data Source
Locally stored structured JSON dataset (`src/data/topics.json`).

### Scope Boundaries
* **In Scope (Week 1):** Responsive dashboard layout, global deep keyword search, category pill filtering, user name personalization, dynamic study progress tracking, study schedule builder, accessible keyboard focus states, and live deployment.
* **Out of Scope:** User authentication/login, backend databases, duty shift rosters, handover notes, and payments.

---

##  Three-Week Work Plan

### Week 1: Foundations (Completed)
* [x] Finalize project idea one-pager and three-week work plan.
* [x] Initialize React project using Vite.
* [x] Design responsive dashboard layout (320px mobile to desktop).
* [x] Implement semantic HTML and accessible UI components.
* [x] Build global keyword search across titles, summaries, categories, and key points.
* [x] Implement category filtering (Fundamentals, Pharmacology, Mental Health).
* [x] Handle empty search and filter states with reset options.
* [x] Add dynamic revision progress tracking and schedule builder.
* [x] Deploy live application to Vercel and apply `week-1` Git tag.

### Week 2: Components & Data Integration
* [ ] Refactor interface into modular, reusable React components (`TopicCard`, `SearchBar`, `CategoryFilter`, `ScheduleWidget`).
* [ ] Asynchronous JSON data loading with explicit loading, success, empty, and error states.
* [ ] Add error retry options and maintain issue log (minimum 5 entries).
* [ ] Tag release: `week-2`.

### Week 3: Quality, Routing & Delivery
* [ ] Implement multi-view client-side routing (Home/Hub, Topic Detail, Favourites, 404 Not Found).
* [ ] Implement persistent favorites state across page reloads using `localStorage`.
* [ ] Add automated tests (component rendering, interaction, and data state).
* [ ] Run accessibility audit (Lighthouse/axe/WAVE) with documented before/after scores.
* [ ] Record 5-minute walkthrough presentation video.
* [ ] Tag final release: `week-3`.

---

##  Top Three Risks & Mitigation Plan

1. **Time Constraints:**
   * *Risk:* Overbuilding optional features could jeopardize completing required BuildLab milestones.
   * *Mitigation:* Focus strictly on weekly core deliverables before adding optional features.

2. **Scope Creep & Complex State Management:**
   * *Risk:* Adding complex routing or authentication prematurely in early weeks.
   * *Mitigation:* Keep state localized, use plain JSON objects, and defer multi-page routing strictly to Week 3.

3. **Content Quality & Accuracy:**
   * *Risk:* Unverified clinical notes could reduce the educational value of the hub.
   * *Mitigation:* Link directly to trusted, peer-reviewed open-access sources (OpenStax Nursing Textbooks and Nurseslabs).

---

##  Setup & Installation Instructions

To run NurseStudy locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ochukome/nursestudy.git](https://github.com/Ochukome/nursestudy.git)
   cd nursestudy


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
