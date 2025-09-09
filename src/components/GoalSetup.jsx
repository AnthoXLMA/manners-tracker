import { useState } from "react";
import { useGoalsStore } from "../store/goalsStore";
import { motion } from "framer-motion";
import mannersData from "../data/manners.json";

export default function GoalSetup() {
  const addGoal = useGoalsStore((state) => state.addGoal);
  const addRandomManner = useGoalsStore((state) => state.addRandomManner);
  const [numManners, setNumManners] = useState(7);
  const [days, setDays] = useState(7);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Extraire les catégories uniques
  const categories = [...new Set(mannersData.map((m) => m.category))];

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal(numManners, days);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredManners = selectedCategory
    ? mannersData.filter((m) => m.category === selectedCategory)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl max-w-lg sm:max-w-md mx-auto mt-12"
    >
      <h2 className="text-3xl sm:text-2xl font-extrabold text-white mb-6 text-center tracking-wide">
        🎯 Définir ton objectif
      </h2>

      {/* Choix du nombre de manières et durée */}
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

        {/* Boutons principaux */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.06, boxShadow: "0 10px 25px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95, opacity: 0.9 }}
          className="bg-white text-purple-600 font-bold py-3 rounded-2xl shadow-lg hover:shadow-2xl transition-all tracking-wide"
        >
          Définir l’objectif
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.95, opacity: 0.9 }}
          onClick={addRandomManner}
          className="bg-white/30 text-white font-semibold py-3 rounded-2xl shadow-md hover:shadow-lg transition-all tracking-wide"
        >
          🎲 Choisir aléatoirement
        </motion.button>
      </form>

      {/* Sélection par catégorie */}
      <div className="mt-8">
        <h3 className="text-white font-bold mb-2 text-lg">Sélectionner par catégorie</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-2xl border-2 text-white transition-all ${
                selectedCategory === cat
                  ? "bg-white text-purple-600 border-white"
                  : "bg-white/20 border-white/50 hover:bg-white/30"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Affichage des manières de la catégorie */}
      {selectedCategory && (
        <div className="mt-4 max-h-60 overflow-y-auto p-3 bg-white/20 rounded-2xl">
          {filteredManners.map((m) => (
            <div key={m.id} className="py-1 px-2 border-b border-white/30 text-white">
              {m.name}
            </div>
          ))}
        </div>
      )}

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
    </motion.div>
  );
}
