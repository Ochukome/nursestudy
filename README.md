# NurseStudy — Open Access Nursing Study Hub

NurseStudy is a simple, modern, and accessible e-learning study hub built for nursing students to find concise topic summaries, key revision points, accredited open-access study materials, and structured study scheduling in one organized platform.

---

## 📄 Idea One-Pager

- **Track:** Frontend Development
- **Stack:** React, Vite, JavaScript, CSS, Git, and GitHub
- **Hosting:** Vercel
- **Target User:** Nursing students seeking a centralized, distraction-free study and revision tool.

### Problem
Nursing students often spend valuable time searching across fragmented lecture notes, physical textbooks, and scattered web links. NurseStudy brings essential topics, concise key points, open-access references, and progress tracking together into one clean dashboard.

### Core Flow
Browse Nursing Subjects → Global Keyword Search or Category Filter → Review Key Points & Study Notes → Track Progress → Schedule Study Sessions.

### Data Source
Locally stored structured JSON dataset (`src/data/topics.json`).

### Scope Boundaries
- **In Scope (Weeks 1 & 2):** Responsive dashboard layout, modular component architecture, asynchronous data fetching simulation (with loading/error/success states), global keyword search, category pill filtering, user name personalization, dynamic study progress tracking, and study schedule builder.
- **Out of Scope:** User authentication/login, backend databases, duty shift rosters, handover notes, and payments.

---

## 📅 Three-Week Work Plan

### Week 1: Foundations (Completed)
- [x] Finalize project idea one-pager and three-week work plan.
- [x] Initialize React project using Vite.
- [x] Design responsive dashboard layout (320px mobile to desktop).
- [x] Implement semantic HTML and accessible UI components.
- [x] Build global keyword search across titles, summaries, categories, and key points.
- [x] Implement category filtering (Fundamentals, Pharmacology, Mental Health).
- [x] Handle empty search and filter states with reset options.
- [x] Add dynamic revision progress tracking and schedule builder.
- [x] Deploy live application to Vercel and apply `week-1` Git tag.

### Week 2: Components & Data Integration (Completed)
- [x] Refactor interface into modular, reusable React components (`TopicCard`, `SearchBar`, `CategoryFilter`, `TopicList`, `ScheduleWidget`, `Header`, `EmptyState`).
- [x] Implement asynchronous JSON data loading with explicit loading, success, empty, and error states.
- [x] Add error retry options and maintain issue log (minimum 5 entries).
- [x] Tag release: `week-2`.

### Week 3: Quality, Routing & Delivery (Upcoming)
- [ ] Implement multi-view client-side routing (Home/Hub, Topic Detail, Favourites, 404 Not Found).
- [ ] Implement persistent favorites state across page reloads using `localStorage`.
- [ ] Add automated tests (component rendering, interaction, and data state).
- [ ] Run accessibility audit (Lighthouse/axe/WAVE) with documented before/after scores.
- [ ] Record 5-minute walkthrough presentation video.
- [ ] Tag final release: `week-3`.

---

## ⚠️ Top Three Risks & Mitigation Plan

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

## 🧩 Component Map
* `src/App.jsx` — Main container managing global state (search query, active category, progress count, async fetching).
* `src/components/Header.jsx` — Renders the student profile greeting and progress indicator banner.
* `src/components/SearchBar.jsx` — Unified global keyword search input field.
* `src/components/CategoryFilter.jsx` — Pill-based category navigation (Fundamentals, Pharmacology, Mental Health).
* `src/components/TopicList.jsx` — Container that maps filtered topics or falls back to the Empty State component.
* `src/components/TopicCard.jsx` — Reusable card displaying individual topic details, badges, key points, and review links.
* `src/components/EmptyState.jsx` — Fallback UI when search queries return no matches or data fails.
* `src/components/ScheduleWidget.jsx` — Interactive calendar date selector and upcoming study schedule manager.

---

## 📝 Week 2 Issue Log
1. **Issue:** Asynchronous loading flashing too fast during development. 
   * *Solution:* Added a controlled `setTimeout` simulation (800ms) to visibly demonstrate the loading state spinner/text.
2. **Issue:** Global search query wasn't matching key points across refactored components. 
   * *Solution:* Maintained `filteredTopics` logic inside a `useMemo` hook linked to parent state and passed down through props.
3. **Issue:** Component file clutter in the root `src/` directory. 
   * *Solution:* Created a dedicated `src/components/` subdirectory to cleanly separate modular elements.
4. **Issue:** Data fetch error simulation lacked a recovery path. 
   * *Solution:* Added an explicit error state conditional render with a "Retry Loading" action button.
5. **Issue:** Mobile sidebar toggle hiding when clicking navigation links. 
   * *Solution:* Attached `setMobileNavOpen(false)` to all tab click handlers so the menu auto-closes on selection.

---

## 🛠️ Setup & Installation Instructions

To run NurseStudy locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ochukome/nursestudy.git](https://github.com/Ochukome/nursestudy.git)
   cd nursestudy