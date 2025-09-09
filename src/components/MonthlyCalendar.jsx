import { useState } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import { useGoalsStore } from "../store/goalsStore";

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

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium text-gray-500">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date) => {
          const percent = getCompletionPercent(date);
          const bgColor =
            percent === 0
              ? "bg-gray-200"
              : percent < 50
              ? "bg-yellow-300"
              : percent < 100
              ? "bg-green-300"
              : "bg-purple-400";

          return (
            <motion.div
              key={date.format("YYYY-MM-DD")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`h-12 w-12 flex items-center justify-center rounded-lg cursor-pointer transition-all hover:scale-110 ${bgColor}`}
              onClick={() => setSelectedDate(date)}
              title={`${percent}% tasks done`}
            >
              <span className="text-sm font-semibold text-gray-800">{date.date()}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Pop-up modal */}
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
              className="bg-white rounded-3xl p-6 w-80 shadow-2xl"
            >
              <h3 className="text-lg font-bold mb-4">
                {selectedDate.format("dddd, MMMM D")}
              </h3>
              <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                {getGoalsByDate(selectedDate).map((goal) => (
                  <label key={goal.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={goal.status === "done"}
                      onChange={() => markDone(goal.id)}
                      className="w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
                    />
                    <span className={goal.status === "done" ? "line-through text-gray-400" : ""}>
                      {goal.title || goal.name}
                    </span>
                  </label>
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
