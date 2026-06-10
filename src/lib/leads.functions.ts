import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const LeadInput = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().max(200).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  source: z.string().max(80).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => LeadInput.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service || null,
      message: data.message || null,
      source: data.source || "website",
    });
    if (error) {
      console.error("submitLead error", error);
      throw new Error("Could not save your enquiry — please try again.");
    }
    return { ok: true };
  });

const FeedbackInput = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional().or(z.literal("")),
  email: z.string().email().max(200).optional().or(z.literal("")),
});

export const submitFeedback = createServerFn({ method: "POST" })
  .validator((input: unknown) => FeedbackInput.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("feedback").insert({
      rating: data.rating,
      comment: data.comment || null,
      email: data.email || null,
    });
    if (error) {
      console.error("submitFeedback error", error);
      throw new Error("Could not save your feedback — please try again.");
    }
    return { ok: true };
  });