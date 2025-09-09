import { useState } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useGoalsStore } from "../store/goalsStore";

// Couleurs selon le pourcentage
const progressColor = (percent) => {
  if (percent === 0) return "#E5E7EB"; // gris
  if (percent < 50) return "#F59E0B"; // jaune
  if (percent < 100) return "#10B981"; // vert
  return "#6366F1"; // violet pour 100%
};

export default function MonthlyCalendar() {
  const goals = useGoalsStore((state) => state.goals);
  const markDone = useGoalsStore((state) => state.markDone);

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.date(i + 1)
  );

  const getGoalsByDate = (date) =>
    goals.filter((g) => g.deadline === date.format("YYYY-MM-DD"));

  const getCompletionPercent = (date) => {
    const dayGoals = getGoalsByDate(date);
    if (!dayGoals.length) return 0;
    const done = dayGoals.filter((g) => g.status === "done").length;
    return Math.round((done / dayGoals.length) * 100);
  };

  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-purple-600 font-bold">&lt;</button>
        <h2 className="text-xl font-semibold">{currentMonth.format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="text-purple-600 font-bold">&gt;</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium text-gray-400">{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date) => {
          const percent = getCompletionPercent(date);

          // Cercle
          const radius = 24;
          const stroke = 3;
          const normalizedRadius = radius - stroke;
          const circumference = normalizedRadius * 2 * Math.PI;
          const strokeDashoffset = circumference - (percent / 100) * circumference;

          return (
            <motion.div
              key={date.format("YYYY-MM-DD")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-14 w-14 relative flex items-center justify-center cursor-pointer"
              onClick={() => setSelectedDate(date)}
            >
              <svg height={radius * 2} width={radius * 2} className="absolute top-0 left-0">
                <circle
                  stroke="#E5E7EB"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke={progressColor(percent)}
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s, stroke 0.5s" }}
                />
              </svg>

              {/* Chiffre centré et plus fin */}
              <span className="absolute inset-0 flex items-center justify-center text-gray-900 text-sm font-medium z-10">
                {date.date()}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Modal Tâches du jour */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 w-80 shadow-2xl flex flex-col"
            >
              <h3 className="text-lg font-bold mb-4 text-center">
                {selectedDate.format("dddd, MMMM D")}
              </h3>

              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {getGoalsByDate(selectedDate).map((goal) => (
                  <div
                    key={goal.id}
                    className="p-2 bg-gray-100 rounded-lg flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={goal.status === "done"}
                      onChange={() => markDone(goal.id)}
                      className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
                    />
                    <span className={goal.status === "done" ? "line-through text-gray-400" : "text-gray-900"}>
                      {goal.name || goal.title || "Sans nom"}
                    </span>
                  </div>
                ))}
                {getGoalsByDate(selectedDate).length === 0 && (
                  <p className="text-gray-400 text-center">Aucune tâche</p>
                )}
              </div>

              <button
                className="mt-4 w-full py-2 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition"
                onClick={() => setSelectedDate(null)}
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
