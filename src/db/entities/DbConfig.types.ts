import { z } from "zod";

export const OptionsSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("normal"),
    name: z.string(),
    duration: z.number()
  }),
  z.object({
    type: z.literal("special"),
    name: z.string(),
    durationSettings: z.object({
      duration: z.number(),
      extend: z.number()
    }),
    code: z.string()
  })
]).nullable();

export type Options = z.infer<typeof OptionsSchema>;

export const TagsSchema = z.array(z.discriminatedUnion("type", [
  z.object({
    type: z.literal("normal"),
    name: z.string()
  }),
  z.object({
    type: z.literal("special"),
    name: z.string(),
    description: z.string()
  }),
]));

export type Tags = z.infer<typeof TagsSchema>;