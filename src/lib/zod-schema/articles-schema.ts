import { getBody } from "better-auth/react";
import z from "zod";

export const ArticleSchema = z.object({
    title: z.string().min(1, 'title field is required'),
    body: z.string().min(1, 'body field is required'),
})