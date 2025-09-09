import { useGoalsStore } from "../store/goalsStore";
import { useMemo } from "react";

export default function DailySummary() {
  const goals = useGoalsStore((state) => state.goals);

  const todaySummary = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const todayGoals = goals.filter((g) => g.deadline === today);
    const doneCount = todayGoals.filter((g) => g.status === "done").length;
    return { total: todayGoals.length, done: doneCount };
  }, [goals]);

  const percent = todaySummary.total > 0 ? (todaySummary.done / todaySummary.total) * 100 : 0;

  return (
    <div className="mt-6 p-6 rounded-2xl shadow-lg bg-gradient-to-r from-green-400 via-indigo-500 to-purple-500 text-white w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Résumé du jour</h3>
      <p className="mb-3 text-lg">
        Tâches faites : <span className="font-extrabold">{todaySummary.done}</span> / {todaySummary.total}
      </p>
      <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
