import { useGoalsStore } from "../store/goalsStore";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // optionnel pour effet ludique
import { useState } from "react";


export default function DailyChecklist() {
  const goals = useGoalsStore((state) => state.goals);
  const markDone = useGoalsStore((state) => state.markDone);

  const today = new Date().toISOString().slice(0, 10);
  const todaysGoals = goals.filter((g) => g.deadline === today);

  const [celebrateId, setCelebrateId] = useState(null);

  const handleCheck = (id) => {
    markDone(id);
    setCelebrateId(id);
    setTimeout(() => setCelebrateId(null), 1500);
  };

  return (
    <div className="mt-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Objectifs du jour
      </h2>

      {todaysGoals.length === 0 ? (
        <p className="text-gray-500 text-center">Aucun objectif pour aujourd'hui.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {todaysGoals.map((g) => (
            <motion.li
              key={g.id}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white rounded-3xl shadow-lg p-4 flex items-center justify-between transition-transform"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={g.status === "done"}
                  onChange={() => handleCheck(g.id)}
                  className="w-6 h-6 accent-green-400 rounded-full cursor-pointer"
                />
                <span className={`font-medium ${g.status === "done" ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {g.text}
                </span>
              </div>

              {/* Confettis animation */}
              {celebrateId === g.id && <Confetti numberOfPieces={50} recycle={false} />}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
