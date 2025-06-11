# 🧠 Mini Habit Tracker

A simple yet functional Habit Tracker app built with **React** and **TypeScript**. I added a few Playwright tests to simulate how I would approach the front end testing.

## ✨ Features

- ✅ Create new habits with optional descriptions
- 📅 Check in daily for each habit
- 🔥 Visualize current streaks
- ⏱ Shows days since last check-in if not currently in a streak
- 🧭 Fully responsive UI with smooth UX
- 🧪 End-to-end testing using **Playwright**
- 🔍 Accessible with semantic HTML and ARIA-friendly markup

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+ recommended
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-habit-tracker.git
cd mini-habit-tracker

2. Install dependencies
npm install

3. Start the developemtn server
npm run dev


For test running:

1. Install Playwright dependencies
npx playwright install

2. Run all tests 
npx playwright test --headed    (the headed flag allows you to see what is happening in browser window)





Developer Notes:
The requirements were as follows:

Creation of new habits to be tracked.
Check in capability on each of the specified habits.
For each habit, show if a check in has occurred today yet or not.
Should show the number of days in the current streak (if a check in happened today or yesterday), OR
Show the number of days since the last check in, if not currently in a streak.

I developed with the frontend and backend implemented separately as standalone applications. The reason for this separation was largely due to time constraints and the fact that the frontend was started first, allowing for quicker iteration on UI/UX before finalizing the API structure. With some more time I would have liked to have combined the apps to seamlessly send and retrieve the data from the backend to persist user data.

The frontend is built using React and TypeScript, and is fully functional on its own with real-time interactions via local API endpoints (or mocked/stubbed data during early development). This allowed for rapid development of core features like habit creation, check-ins, and streak tracking while the backend was being planned.

The backend is a RESTful API built with Python, Flask, and SQLAlchemy. While I had some familiarity with Python, I had less hands-on experience compared to JavaScript/TypeScript, so there was a learning curve involved in translating the app's requirements into Pythonic patterns and idioms whilst using Flask. 

Despite the separation, integrating both together should not be a challenging task, time permitting.