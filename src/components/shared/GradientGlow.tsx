interface GradientGlowProps {
  className?: string;
}

export function GradientGlow({ className }: GradientGlowProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)",
      }}
    />
  );
}
