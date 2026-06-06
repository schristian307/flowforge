"use client";

import { motion, useReducedMotion } from "framer-motion";
import BorderGlow from "@/components/BorderGlow";

const glowColors = ["#c084fc", "#f472b6", "#38bdf8"] as const;

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

const VIEWBOX_WIDTH = 580;
const VIEWBOX_HEIGHT = 320;

function nodePosition(x: number, y: number) {
  return {
    left: `${(x / VIEWBOX_WIDTH) * 100}%`,
    top: `${(y / VIEWBOX_HEIGHT) * 100}%`,
  };
}

function PipelineNode({
  label,
  x,
  y,
  delay = 0,
  compact = false,
  float = false,
  floatIndex = 0,
}: {
  label: string;
  x: number;
  y: number;
  delay?: number;
  compact?: boolean;
  float?: boolean;
  floatIndex?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const position = nodePosition(x, y);

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={position}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              y: float ? [0, -4, 0] : 0,
            }
      }
      transition={{
        opacity: { delay, duration: 0.4 },
        scale: { delay, duration: 0.4 },
        y: float
          ? {
              duration: 3 + floatIndex * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined,
      }}
    >
      <BorderGlow
        edgeSensitivity={compact ? 20 : 24}
        glowColor="40 80 80"
        backgroundColor="#111111"
        borderRadius={compact ? 5 : 6}
        glowRadius={compact ? 12 : 16}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={[...glowColors]}
        fillOpacity={0.35}
      >
        <span
          className={`block whitespace-nowrap font-semibold text-white ${
            compact ? "px-3 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"
          }`}
        >
          {label}
        </span>
      </BorderGlow>
    </motion.div>
  );
}

export function PipelineVisualization() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#120F17"
      borderRadius={16}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={[...glowColors]}
      className="mx-auto w-full max-w-xl lg:max-w-none"
    >
      <div
        className="relative w-full p-4 lg:p-6"
        style={{ aspectRatio: `${VIEWBOX_WIDTH} / ${VIEWBOX_HEIGHT}` }}
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="absolute inset-0 h-full w-full"
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
          <motion.path
            d="M 110 260 L 210 250 L 330 260 L 450 250"
            stroke="url(#pipeGrad)"
            strokeWidth="1"
            fill="none"
            initial={prefersReducedMotion ? {} : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
          />

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

        <div className="absolute inset-0">
          {pipelineNodes.map((node, i) => (
            <PipelineNode
              key={node.id}
              label={node.label}
              x={node.x}
              y={node.y}
              delay={0.4 + i * 0.15}
              float
              floatIndex={i}
            />
          ))}

          {crmNodes.map((node, i) => (
            <PipelineNode
              key={node.id}
              label={node.label}
              x={node.x}
              y={node.y}
              delay={1.8 + i * 0.12}
              compact
            />
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}
