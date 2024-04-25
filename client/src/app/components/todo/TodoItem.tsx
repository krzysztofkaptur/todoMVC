"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteTodo, updateTodo } from "@/app/services/todos";

import type { Todo } from "./types";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(todo.text || "");

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditMode = (value: boolean) => {
    setEditMode(value);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateTodo(todo.id, {
        text: value,
        completed: todo.completed,
      });

      router.refresh();

      handleEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckbox = async () => {
    try {
      await updateTodo(todo.id, {
        text: todo.text,
        completed: !todo.completed,
      });

      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article>
      {editMode ? (
        <form
          onSubmit={handleUpdate}
          className="m-4 flex justify-between gap-4 p-4"
        >
          <div className="flex gap-4">
            <input type="checkbox" disabled checked={todo.completed} />
            <input
              type="text"
              className="text-black"
              value={value}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => handleEditMode(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      ) : (
        <div className="m-4 flex justify-between gap-4 p-4">
          <div className="flex gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleCheckbox}
            />
            <span>{todo.text}</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleEditMode(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </article>
  );
};
