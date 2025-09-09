import { create } from "zustand";
import dayjs from "dayjs";
import mannersData from "../data/manners.json";

export const useGoalsStore = create((set, get) => ({
  goals: [],

  // Ajouter un objectif : nombre de manières + durée en jours
  addGoal: (numManners = 7, days = 7) => {
    // Prendre un sous-ensemble aléatoire pour plus de variété
    const shuffled = [...mannersData].sort(() => 0.5 - Math.random());
    const selectedManners = shuffled.slice(0, numManners);

    const today = dayjs();
    const newGoals = selectedManners.map((manner, index) => ({
      ...manner,
      id: manner.id ?? index, // s'assurer d'avoir un ID unique
      deadline: today.add(Math.floor(index / (numManners / days)), "day").format("YYYY-MM-DD"),
      status: "pending",
    }));

    set({ goals: newGoals });
  },

  // Marquer une manière comme faite
  markDone: (id) => {
    set({
      goals: get().goals.map((g) =>
        g.id === id ? { ...g, status: "done" } : g
      )
    });
  },

  // Selectors simples pour les composants

  // Objectifs du jour
  getTodayGoals: () => {
    const today = dayjs().format("YYYY-MM-DD");
    return get().goals.filter((g) => g.deadline === today);
  },

  // Pourcentage de progression global
  getProgressPercent: () => {
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

    const random = remaining[Math.floor(Math.random() * remaining.length)];
    set({ goals: [...get().goals, { ...random, status: "pending", deadline: dayjs().format("YYYY-MM-DD") }] });
  }
}));
