"use client";

import { useRouter } from "next/navigation";
import { deleteTodo } from "@/app/services/todos";

import type { Todo } from "./types";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(todo.id);

    router.refresh();
  };

  return (
    <article className="m-4 flex justify-between gap-4 p-4">
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>{todo.text}</span>
      </div>
      <button onClick={handleDelete}>delete</button>
    </article>
  );
};
