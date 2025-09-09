import { useState, useEffect } from "react";
import { useGoalsStore } from "./store/goalsStore";
import GoalSetup from "./components/GoalSetup";
import ProgressBar from "./components/ProgressBar";
import DailySummary from "./components/DailySummary";
import MonthlyCalendar from "./components/MonthlyCalendar";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const goals = useGoalsStore((state) => state.goals);
  const getTodayGoals = useGoalsStore((state) => state.getTodayGoals);
  const [todaySummary, setTodaySummary] = useState({ done: 0, total: 0 });

  useEffect(() => {
    const todayGoals = getTodayGoals();
    const doneCount = todayGoals.filter((g) => g.status === "done").length;
    setTodaySummary({ done: doneCount, total: todayGoals.length });
  }, [goals, getTodayGoals]);

  const tabs = [
    { label: "Dashboard", component: (
        <>
          <ProgressBar />
          <DailySummary todaySummary={todaySummary} />
        </>
      )
    },
    { label: "Calendrier", component: <MonthlyCalendar /> },
    { label: "Objectifs", component: <GoalSetup /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 flex flex-col">
      {/* Onglets */}
      <nav className="flex flex-col items-center bg-white shadow-md p-3 sticky top-0 z-10 rounded-b-2xl">
        <div className="flex justify-around w-full mb-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              className={`font-semibold px-4 py-2 rounded-full transition-all ${
                activeTab === index
                  ? "bg-purple-500 text-white shadow-lg scale-105"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bullets indicateurs */}
        <div className="flex gap-2">
          {tabs.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                activeTab === index ? "bg-purple-500" : "bg-gray-300"
              }`}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </nav>

      {/* Contenu swipeable */}
      <div className="overflow-hidden flex-1 p-4 max-w-md sm:max-w-3xl mx-auto">
        <motion.div
          key={activeTab}
          className="flex w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(event, info) => {
            if (info.offset.x < -50 && activeTab < tabs.length - 1) {
              setActiveTab(activeTab + 1);
            } else if (info.offset.x > 50 && activeTab > 0) {
              setActiveTab(activeTab - 1);
            }
          }}
        >
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              {tabs[activeTab].component && (
                <motion.div
                  className="p-6 bg-white rounded-3xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {tabs[activeTab].component}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="mt-8 text-center text-gray-400 p-4">
        © {new Date().getFullYear()} Bonnes Habitudes
      </footer>
    </div>
  );
}
