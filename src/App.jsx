import GoalSetup from "./components/GoalSetup";
import DailyChecklist from "./components/DailyChecklist";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-red-50 p-6 flex flex-col items-center gap-10">

      {/* Header */}
      <header className="text-center mt-6">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-2 animate-pulse">
          Bonnes Manières
        </h1>
        <p className="text-purple-500 text-lg">
          Suivez vos bonnes habitudes quotidiennes avec style !
        </p>
      </header>

      {/* Goal Setup Card */}
      <GoalSetup />

      {/* Progress Bar */}
      <ProgressBar />

      {/* Daily Checklist */}
      <DailyChecklist />

      {/* Footer */}
      <footer className="text-gray-400 mt-12 text-sm">
        &copy; 2025 – Transformez vos manières en habitudes !
      </footer>
    </div>
  );
}
