import { useGoalsStore } from "../store/goalsStore";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export default function ProgressBar() {
  const percent = useGoalsStore((state) => state.progressPercent());
  const radius = 70;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;

  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => circumference - (circumference * v) / 100);

  useEffect(() => {
    const controls = animate(progress, percent, { duration: 0.8 });
    return () => controls.stop();
  }, [percent]);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
          {Math.round(progress.get())}%
        </div>
      </div>
      <p className="mt-4 text-gray-600">Progression globale</p>
    </div>
  );
}
