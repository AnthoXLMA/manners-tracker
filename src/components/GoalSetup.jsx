import { useState } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useGoalsStore } from "../store/goalsStore";
import mannersData from "../data/manners.json";

export default function GoalSetup() {
  const addGoal = useGoalsStore((state) => state.addGoal);
  const addCustomManners = useGoalsStore((state) => state.addCustomManners);
  const addRandomManner = useGoalsStore((state) => state.addRandomManner);

  const [numManners, setNumManners] = useState(7);
  const [days, setDays] = useState(7);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedManners, setSelectedManners] = useState([]);
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
    setSelectedManners([]);
  };

  const filteredManners = selectedCategory
    ? mannersData.filter((m) => m.category === selectedCategory)
    : [];

  const toggleMannerSelection = (manner) => {
    if (selectedManners.includes(manner)) {
      setSelectedManners(selectedManners.filter((m) => m !== manner));
    } else {
      setSelectedManners([...selectedManners, manner]);
    }
  };

  const handleAddSelected = () => {
    if (selectedManners.length === 0) return;
    addCustomManners(selectedManners, days);
    setSelectedManners([]);
    setSelectedCategory(null);
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
        🎯 Bonnes Manières
      </h2>

      {/* Formulaire Objectif */}
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
          />
        </div>

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

      {/* Affichage des manières */}
      {selectedCategory && (
        <div className="mt-4 max-h-60 overflow-y-auto p-3 bg-white/20 rounded-2xl">
          {filteredManners.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleMannerSelection(m)}
              className={`cursor-pointer py-1 px-2 border-b border-white/30 text-white transition-all ${
                selectedManners.includes(m) ? "bg-white/50 text-purple-700 font-bold" : ""
              }`}
            >
              {m.name}
            </div>
          ))}

          {selectedManners.length > 4 && (
            <motion.button
              onClick={handleAddSelected}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 w-full py-2 bg-white text-purple-600 font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              Ajouter les {selectedManners.length} manières sélectionnées
            </motion.button>
          )}
        </div>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-2 text-center text-white font-bold mt-4 tracking-wide"
        >
          🎉 Objectif mis à jour !
        </motion.div>
      )}
    </motion.div>
  );
}
