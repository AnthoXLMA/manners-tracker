import { useGoalsStore } from "../store/goalsStore";
import { motion } from "framer-motion";

export default function DailySummary() {
  const todayGoals = useGoalsStore((state) => state.getTodayGoals());
  const doneCount = todayGoals.filter((g) => g.status === "done").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg max-w-md mx-auto"
    >
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 text-center">
        🎯 Résumé du jour
      </h3>
      <p className="text-white text-lg text-center">
        Tâches faites : <span className="font-bold">{doneCount}</span> /{" "}
        <span className="font-bold">{todayGoals.length}</span>
      </p>
    </motion.div>
  );
}
