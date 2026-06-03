"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/actions/auth";
import { SITE } from "@/lib/constants/site";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const error = searchParams.get("error");
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginAdmin(email, password, redirect);

    if (result && !result.success) {
      toast.error("Login failed", { description: result.error });
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link href="/" className="text-xl font-semibold text-foreground">
            {SITE.name}
          </Link>
          <h1 className="mt-4 text-2xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to access the dashboard at{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              /dashboard
            </Link>
          </p>
          {error === "unauthorized" && (
            <p className="mt-2 text-sm text-destructive">
              Your email is not authorized for admin access.
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
