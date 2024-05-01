"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { createTodo } from "@/app/services/todos";
import { addTodoSchema } from "@/app/libs/validation";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";
import { CreateTodo } from "@/app/components/todo/types";

export const CreateTodoForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addTodoSchema),
  });

  const { mutate: createTodoMutation, isPending: isCreateTodoPending } =
    useMutation({
      mutationFn: (body: CreateTodo) => createTodo(body),
      onSuccess: () => {
        reset();
        router.refresh();
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const onSubmit = handleSubmit(async (values: FieldValues) => {
    createTodoMutation({
      text: values.text,
      completed: false,
    });
  });

  return (
    <Form onSubmit={onSubmit} className="justify-between">
      <InputGroup
        {...register("text")}
        error={errors.text?.message as string}
      />
      <Button isLoading={isCreateTodoPending} type="submit">
        <Plus className="h-4 w-4" />
      </Button>
    </Form>
  );
};
