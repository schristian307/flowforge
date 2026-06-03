import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Skeleton className="h-64 w-80 rounded-xl" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
