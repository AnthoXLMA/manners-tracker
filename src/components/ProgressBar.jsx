import { useGoalsStore } from "../store/goalsStore";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";


export default function ProgressBar() {
  const goals = useGoalsStore((state) => state.goals);
  const total = goals.length;
  const done = goals.filter((g) => g.status === "done").length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const [animatedPercent, setAnimatedPercent] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const controls = animate(animatedPercent, percent, {
      duration: 0.8,
      onUpdate(value) {
        setAnimatedPercent(value.toFixed(0));
      },
    });
    return () => controls.stop();
  }, [percent]);

  const radius = 70;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * animatedPercent) / 100;

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full">
          {/* Cercle de fond */}
          <circle
            cx="100%"
            cy="100%"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Cercle animé */}
          <circle
            ref={circleRef}
            cx="100%"
            cy="100%"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        {/* Pourcentage centré */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800">
          {animatedPercent}%
        </div>
      </div>
      <p className="mt-4 text-gray-600">Progression globale</p>
    </div>
  );
}
