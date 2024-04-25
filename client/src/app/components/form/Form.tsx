"use client";

import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/app/components/input";
import { createTodo } from "@/app/services/todos";
import { addTodoSchema } from "@/app/libs/validation";

export const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTodoSchema),
  });

  const onSubmit = handleSubmit(async (values: FieldValues) => {
    await createTodo({
      text: values.text,
      completed: false,
    });
    ref.current!.reset();

    router.refresh();
  });

  return (
    <form ref={ref} onSubmit={onSubmit} className="align-start flex gap-4">
      <Input {...register("text")} error={errors.text?.message} />
      <button type="submit">Add</button>
    </form>
  );
};
