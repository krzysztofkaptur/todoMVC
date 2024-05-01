"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, Pencil, Ban, Check } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { deleteTodo, updateTodo } from "@/app/services/todos";
import { addTodoSchema } from "@/app/libs/validation";
import { Button } from "@/app/components/ui/button";
import { InputGroup } from "@/app/components/inputGroup";
import { Form } from "@/app/components/form";
import { Checkbox } from "@/app/components/ui/checkbox";

import type { CreateTodo, Todo } from "./types";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTodoSchema),
  });

  const { mutate: deleteTodoMutation, isPending: isDeleteTodoPending } =
    useMutation({
      mutationFn: (body: number) => deleteTodo(body),
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const handleDelete = async () => {
    deleteTodoMutation(todo.id);
  };

  const handleEditMode = (value: boolean) => {
    setEditMode(value);
  };

  const { mutate: updateTodoMutation, isPending: isUpdateTodoMutation } =
    useMutation({
      mutationFn: ({ id, body }: { id: number; body: CreateTodo }) =>
        updateTodo(id, body),
      onSuccess: () => {
        router.refresh();
        handleEditMode(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const handleUpdate = handleSubmit(async (values: FieldValues) => {
    updateTodoMutation({
      id: todo.id,
      body: {
        text: values.text,
        completed: todo.completed,
      },
    });
  });

  const handleCheckbox = async () => {
    updateTodoMutation({
      id: todo.id,
      body: {
        text: todo.text,
        completed: !todo.completed,
      },
    });
  };

  useEffect(() => {
    if (todo.id) {
      setValue("text", todo.text);
    }
  }, [todo, setValue]);

  const isLoading = isDeleteTodoPending || isUpdateTodoMutation;

  return (
    <article className="shadow-md">
      {editMode ? (
        <Form
          onSubmit={handleUpdate}
          className="m-4 flex justify-between gap-4 p-4"
        >
          <div className="flex items-center gap-4">
            <Checkbox disabled checked={todo.completed} />
            <InputGroup
              {...register("text")}
              error={errors.text?.message as string}
            />
          </div>
          <div className="flex gap-4">
            <Button
              isLoading={isLoading}
              variant="ghost"
              onClick={() => handleEditMode(false)}
            >
              <Ban className="h-4 w-4" />
            </Button>
            <Button isLoading={isLoading} variant="outline" type="submit">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </Form>
      ) : (
        <div className="m-4 flex justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleCheckbox}
            />
            <span>{todo.text}</span>
          </div>
          <div className="flex gap-4">
            <Button
              isLoading={isLoading}
              variant="outline"
              onClick={() => handleEditMode(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              isLoading={isLoading}
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};
