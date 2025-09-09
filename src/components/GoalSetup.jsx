import { useState } from "react";
import { useGoalsStore } from "../store/goalsStore";
import { motion } from "framer-motion";

export default function GoalSetup() {
  const addGoal = useGoalsStore((state) => state.addGoal);
  const [numManners, setNumManners] = useState(7);
  const [days, setDays] = useState(7);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(numManners, days);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);
  };

  return (
    <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="p-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl max-w-lg sm:max-w-md mx-auto mt-12"
>
  <h2 className="text-3xl sm:text-2xl font-extrabold text-white mb-6 text-center tracking-wide">
    🎯 Définir ton objectif
  </h2>

  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
    <div className="flex flex-col">
      <label className="text-white font-semibold mb-2">
        Nombre de bonnes manières
      </label>
      <input
        type="number"
        min="1"
        max="50"
        value={numManners}
        onChange={(e) => setNumManners(Number(e.target.value))}
        className="w-full px-5 py-3 rounded-2xl border-2 border-white bg-white/20 text-white placeholder-white focus:outline-none focus:ring-4 focus:ring-white/50 transition-all hover:bg-white/30"
        placeholder="Ex: 7"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-white font-semibold mb-2">Durée (jours)</label>
      <input
        type="number"
        min="1"
        max="30"
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        className="w-full px-5 py-3 rounded-2xl border-2 border-white bg-white/20 text-white placeholder-white focus:outline-none focus:ring-4 focus:ring-white/50 transition-all hover:bg-white/30"
        placeholder="Ex: 7"
      />
    </div>

    <motion.button
      type="submit"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-purple-600 font-bold py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all tracking-wide"
    >
      Définir l’objectif
    </motion.button>

    {submitted && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center gap-2 text-center text-white font-bold mt-4 tracking-wide"
      >
        🎉 Objectif ajouté : {numManners} manières en {days} jours !
      </motion.div>
    )}
  </form>
</motion.div>
  );
}
