"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/constants/services";
import { submitContact } from "@/actions/contact";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      service: undefined,
      budget: undefined,
      message: "",
    },
  });

  const serviceValue = watch("service");
  const budgetValue = watch("budget");

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContact(data);
      if (result.success) {
        toast.success("Message received", {
          description:
            "Thank you for reaching out. Expect a response within 1–2 business days.",
        });
        reset();
      } else {
        toast.error("Failed to send message", {
          description: result.error,
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        label="Contact"
        title="Let's discuss your project."
        description="Share your project details and I'll respond with next steps within 1–2 business days."
      />

      <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-surface/50 p-6 backdrop-blur-sm md:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <Select
              value={serviceValue}
              onValueChange={(v) => {
                if (!v) return;
                setValue("service", v as ContactFormValues["service"], {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger
                id="service"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p id="service-error" className="text-sm text-destructive">
                {errors.service.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select
              value={budgetValue}
              onValueChange={(v) => {
                if (!v) return;
                setValue("budget", v as ContactFormValues["budget"], {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger
                id="budget"
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
              >
                <SelectValue placeholder="Select a budget" />
              </SelectTrigger>
              <SelectContent>
                {BUDGET_OPTIONS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.budget && (
              <p id="budget-error" className="text-sm text-destructive">
                {errors.budget.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Describe your project, goals, and timeline..."
            rows={5}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
      </div>
    </SectionWrapper>
  );
}
