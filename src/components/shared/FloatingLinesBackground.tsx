"use client";

import FloatingLines from "@/components/FloatingLines";

export function FloatingLinesBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <FloatingLines
        linesGradient={["#E945F5", "#2F4BC0", "#E945F5"]}
        animationSpeed={1}
        interactive
        bendRadius={5}
        bendStrength={-0.5}
        mouseDamping={0.05}
        parallax
        parallaxStrength={0.2}
      />
    </div>
  );
}
