import { z } from "zod";

export const addTodoSchema = z.object({
  text: z.string().min(3).max(100),
});

export const editTodoSchema = z.object({
  text: z.string().min(3).max(100),
});
