import { z } from "zod";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/constants/services";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
