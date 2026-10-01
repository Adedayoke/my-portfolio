"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TEXT = "Native Dev";
const CHAR_DELAY = 72;
const HOLD = 650;

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 500);
    return () => clearInterval(t);
  }, []);

  // Typing
  useEffect(() => {
    let i = 0;
    const tick = setInterval(() => {
      i++;
      setCount(i);
      if (i >= TEXT.length) {
        clearInterval(tick);
        setTimeout(() => setExiting(true), HOLD);
      }
    }, CHAR_DELAY);
    return () => clearInterval(tick);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => exiting && onComplete()}
    >
      {/* ND mark */}
      <motion.svg
        width="52"
        height="52"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <rect width="200" height="200" rx="28" fill="#161616" />
        <rect x="24" y="38" width="22" height="124" fill="white" />
        <polygon points="46,38 72,38 108,162 82,162" fill="white" />
        <rect x="96" y="38" width="22" height="124" fill="white" />
        <path
          d="M118 38 C172 38 176 66 176 100 C176 134 172 162 118 162 L96 162 L96 38 Z"
          fill="white"
        />
        <path
          d="M118 58 C154 58 156 76 156 100 C156 124 154 142 118 142 L116 142 L116 58 Z"
          fill="#161616"
        />
      </motion.svg>

      {/* Typing text */}
      <motion.div
        className="font-mono font-medium text-[10vw] sm:text-6xl md:text-7xl tracking-[0.22em] text-white uppercase select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.01 }}
      >
        {TEXT.slice(0, count)}
        <span
          className="inline-block w-[0.06em] bg-white align-middle mx-[0.06em]"
          style={{
            height: "0.85em",
            marginBottom: "0.08em",
            opacity: count < TEXT.length ? (cursorOn ? 1 : 0) : 0,
            transition: "opacity 0.1s",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
