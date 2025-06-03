# Equipment Rental Management Dashboard

A responsive React + Tailwind CSS dashboard for managing equipment inventory, rental orders, and maintenance records, with all data persisted in browser localStorage.

---

## 🚀 Demo

- **Live App:** [https://rental-app-eight-ebon.vercel.app/](https://rental-app-eight-ebon.vercel.app/)
- **GitHub Repo:**  https://github.com/vikas3303/rental-app#

---


- **components/**: Reusable UI components (forms, lists, cards, charts, calendar, notifications).
- **contexts/**: React Context providers for global state and localStorage sync.
- **pages/**: Route-level components for each main view.
- **utils/**: Utility functions for localStorage, roles, etc.
- **styles/**: Tailwind CSS and custom styles.

---

## ✨ Features

- **User Authentication (Simulated):**
  - Hardcoded users (Admin, Staff, Customer).
  - Role-based access control.
  - Session persistence with localStorage.

- **Equipment Management:**
  - Add, edit, delete, and view equipment.
  - Equipment detail page with rental and maintenance history.

- **Rental Orders:**
  - Create, edit, delete rental orders.
  - Filter by status, customer, or equipment.
  - Calendar view for scheduled rentals.

- **Maintenance Records:**
  - Add, edit, delete, and view maintenance records per equipment.

- **Dashboard:**
  - KPI cards: Total Equipment, Available vs Rented, Overdue Rentals, Upcoming Maintenance.
  - Visual charts (doughnut/bar) for quick insights.

- **Notification Center:**
  - In-app, dismissible notifications for key events.

- **Responsive Design:**
  - Fully responsive for mobile, tablet, and desktop.

- **LocalStorage Persistence:**
  - All data is stored in browser localStorage. No backend or external APIs.

---

## 🛠️ Technical Decisions

- **Frontend Only:** No backend; all data is simulated and persisted using localStorage for easy demo and testing.
- **React Context API:** Used for global state management and to avoid prop drilling.
- **Tailwind CSS:** For rapid, consistent, and responsive UI styling.
- **Chart.js (via react-chartjs-2):** For data visualization in dashboard KPIs.
- **Role-based Access:** Only Admin and Staff can access management and analytics features; Customers have limited access.
- **Clean Architecture:** Components are modular, with separation of concerns between UI, business logic, and state.

---

## ⚠️ Known Issues / Limitations

- **No real authentication:** User login is simulated with hardcoded credentials.
- **No backend:** All data is local to the browser; clearing browser data will erase all records.
- **No multi-user support:** Each browser session is isolated.
- **No server-side validation:** All validation is client-side.
- **No email notifications:** All notifications are in-app only.

---

## 👤 Sample Users

| Role     | Email               | Password   |
|----------|---------------------|------------|
| Admin    | admin@entnt.in      | admin123   |
| Staff    | staff@entnt.in      | staff123   |
| Customer | customer@entnt.in   | cust123    |

---


-
