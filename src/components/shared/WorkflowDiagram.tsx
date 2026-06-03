"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 60, y: 50, label: "Webhook" },
  { x: 160, y: 30, label: "Score" },
  { x: 260, y: 55, label: "Route" },
  { x: 360, y: 35, label: "CRM" },
  { x: 460, y: 50, label: "Email" },
  { x: 260, y: 120, label: "Follow-up" },
];

export function WorkflowDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 520 160"
      className="pointer-events-none w-full max-w-md opacity-50"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <motion.path
        d="M 60 50 L 160 30 L 260 55 L 360 35 L 460 50"
        stroke="url(#wfGrad)"
        strokeWidth="1.5"
        fill="none"
        initial={prefersReducedMotion ? {} : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 260 55 L 260 120"
        stroke="url(#wfGrad)"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        initial={prefersReducedMotion ? {} : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      />

      {nodes.map((node, i) => (
        <motion.g
          key={node.label}
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.15, duration: 0.35 }}
        >
          <rect
            x={node.x - 32}
            y={node.y - 12}
            width={64}
            height={24}
            rx={5}
            fill="#0F0F0F"
            stroke="#222222"
            strokeWidth={1}
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="#A1A1AA"
            fontSize="10"
            fontFamily="var(--font-geist-sans)"
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
