import { create } from "zustand";
import dayjs from "dayjs";
import mannersData from "../data/manners.json";

export const useGoalsStore = create((set, get) => ({
  goals: [],

  // Ajouter un objectif : nombre de manières + durée en jours
  addGoal: (numManners = 7, days = 7) => {
  const shuffled = [...mannersData].sort(() => 0.5 - Math.random());
  const selectedManners = shuffled.slice(0, numManners);

  const today = dayjs();

  // Déterminer le pas entre chaque manière pour les répartir sur les jours
  const dayStep = Math.max(1, Math.floor(days / numManners));

  const newGoals = selectedManners.map((manner, index) => ({
    ...manner,
    id: manner.id ?? index,
    deadline: today.add(index * dayStep, "day").format("YYYY-MM-DD"),
    status: "pending",
  }));

  set({ goals: newGoals });
},

  // Marquer une manière comme faite
  markDone: (id) => {
    set({
      goals: get().goals.map((g) =>
        g.id === id ? { ...g, status: "done" } : g
      ),
    });
  },

  // Objectifs du jour
  getTodayGoals: () => {
    const today = dayjs().format("YYYY-MM-DD");
    return get().goals.filter((g) => g.deadline === today);
  },

  // Pourcentage de progression global
  progressPercent: () => {
    const goals = get().goals;
    if (!goals.length) return 0;
    const done = goals.filter((g) => g.status === "done").length;
    return Math.round((done / goals.length) * 100);
  },

  // Ajouter une manière aléatoire (pour futur mode premium “suggestion du jour”)
  addRandomManner: () => {
    const remaining = mannersData.filter(
      (m) => !get().goals.find((g) => g.id === m.id)
    );
    if (!remaining.length) return;

    const random =
      remaining[Math.floor(Math.random() * remaining.length)];
    set({
      goals: [
        ...get().goals,
        { ...random, status: "pending", deadline: dayjs().format("YYYY-MM-DD") },
      ],
    });
  },

  addCustomManners: (manners, days = 7) => {
  const today = dayjs();
  const newGoals = manners.map((manner, index) => ({
    ...manner,
    id: Date.now() + index,
    status: "pending",
    deadline: today.add(index * Math.floor(days / manners.length), "day").format("YYYY-MM-DD"),
  }));
  set({ goals: [...get().goals, ...newGoals] });
},
}));

