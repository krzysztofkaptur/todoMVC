"use client";

import { useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input } from "@/app/components/input";
import { createTodo } from "@/app/services/todos";

export const Form = () => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { handleSubmit, register } = useForm();

  const onSubmit = async (values: FieldValues) => {
    await createTodo({
      text: values.text,
      completed: false,
    });
    ref.current!.reset();

    router.refresh();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("text")} />
      <button type="submit">Add</button>
    </form>
  );
};
