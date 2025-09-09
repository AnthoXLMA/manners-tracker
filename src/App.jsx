import { useState, useEffect } from "react";
import { useGoalsStore } from "./store/goalsStore";
import GoalSetup from "./components/GoalSetup";
import ProgressBar from "./components/ProgressBar";
import DailySummary from "./components/DailySummary";
import MonthlyCalendar from "./components/MonthlyCalendar";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const goals = useGoalsStore((state) => state.goals);
  const getTodayGoals = useGoalsStore((state) => state.getTodayGoals);
  const [todaySummary, setTodaySummary] = useState({ done: 0, total: 0 });

  useEffect(() => {
    const todayGoals = getTodayGoals();
    const doneCount = todayGoals.filter((g) => g.status === "done").length;
    setTodaySummary({ done: doneCount, total: todayGoals.length });
  }, [goals, getTodayGoals]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Onglets */}
      <nav className="flex justify-around bg-white shadow-md p-3 sticky top-0 z-10">
        <button
          className={`font-semibold px-4 py-2 rounded ${
            activeTab === "dashboard" ? "bg-purple-500 text-white" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`font-semibold px-4 py-2 rounded ${
            activeTab === "calendar" ? "bg-purple-500 text-white" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendrier
        </button>
        <button
          className={`font-semibold px-4 py-2 rounded ${
            activeTab === "setup" ? "bg-purple-500 text-white" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("setup")}
        >
          Objectifs
        </button>
      </nav>

      <div className="p-4 max-w-3xl mx-auto">
        {activeTab === "dashboard" && (
          <>
            <ProgressBar />
            <DailySummary todaySummary={todaySummary} />
          </>
        )}

        {activeTab === "calendar" && <MonthlyCalendar />}

        {activeTab === "setup" && <GoalSetup />}
      </div>

      <footer className="mt-8 text-center text-gray-400">
        © {new Date().getFullYear()} DitesMerci App
      </footer>
    </div>
  );
}
