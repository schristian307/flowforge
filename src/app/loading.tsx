import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Skeleton className="h-16 w-full rounded-none" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <Skeleton className="h-12 w-96 max-w-full" />
        <Skeleton className="h-6 w-72 max-w-full" />
        <Skeleton className="h-10 w-48" />
      </div>
    </div>
  );
}
