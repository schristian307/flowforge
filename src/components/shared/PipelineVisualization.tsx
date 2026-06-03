"use client";

import { motion, useReducedMotion } from "framer-motion";

const pipelineNodes = [
  { id: "capture", x: 40, y: 80, label: "Lead Capture", w: 100 },
  { id: "score", x: 170, y: 40, label: "Score", w: 72 },
  { id: "route", x: 280, y: 80, label: "Route", w: 72 },
  { id: "crm", x: 390, y: 40, label: "CRM", w: 64 },
  { id: "notify", x: 490, y: 80, label: "Notify", w: 80 },
  { id: "followup", x: 280, y: 160, label: "Auto Follow-up", w: 110 },
];

const crmNodes = [
  { id: "inquiry", x: 60, y: 260, label: "Inquiry" },
  { id: "qualify", x: 180, y: 240, label: "Qualify" },
  { id: "assign", x: 300, y: 260, label: "Assign" },
  { id: "respond", x: 420, y: 240, label: "Respond" },
];

export function PipelineVisualization() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-xl lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 580 320"
        className="relative w-full drop-shadow-[0_0_40px_rgba(59,130,246,0.08)]"
      >
        <defs>
          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main automation pipeline */}
        <motion.path
          d="M 90 80 L 206 60 L 316 80 L 422 60 L 530 80"
          stroke="url(#pipeGrad)"
          strokeWidth="1.5"
          fill="none"
          filter="url(#glow)"
          initial={prefersReducedMotion ? {} : { pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M 316 80 L 335 160 L 335 160"
          stroke="url(#pipeGrad)"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          initial={prefersReducedMotion ? {} : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M 206 60 L 335 160"
          stroke="url(#pipeGrad)"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.5"
          initial={prefersReducedMotion ? {} : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.2 }}
        />

        {/* CRM sub-flow */}
        <motion.path
          d="M 110 260 L 210 250 L 330 260 L 450 250"
          stroke="url(#pipeGrad)"
          strokeWidth="1"
          fill="none"
          initial={prefersReducedMotion ? {} : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
        />

        {pipelineNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
          >
            <motion.rect
              x={node.x - node.w / 2}
              y={node.y - 14}
              width={node.w}
              height={28}
              rx={6}
              fill="#0F0F0F"
              stroke="#222222"
              strokeWidth={1}
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [node.y - 14, node.y - 18, node.y - 14] }
              }
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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

        {crmNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.8 + i * 0.12 }}
          >
            <rect
              x={node.x - 36}
              y={node.y - 12}
              width={72}
              height={24}
              rx={5}
              fill="#0A0A0A"
              stroke="#1a1a1a"
              strokeWidth={1}
            />
            <text
              x={node.x}
              y={node.y + 3}
              textAnchor="middle"
              fill="#71717A"
              fontSize="9"
              fontFamily="var(--font-geist-sans)"
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Animated data pulse dots */}
        {!prefersReducedMotion &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r={3}
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                offsetDistance: ["0%", "100%"],
              }}
              style={{
                offsetPath:
                  'path("M 90 80 L 206 60 L 316 80 L 422 60 L 530 80")',
              }}
              transition={{
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
      </svg>
    </div>
  );
}
