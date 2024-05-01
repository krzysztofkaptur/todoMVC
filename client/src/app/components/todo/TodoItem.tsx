"use client";

import { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { deleteTodo, updateTodo } from "@/app/services/todos";
import { addTodoSchema } from "@/app/libs/validation";
import { Button } from "@/app/components/ui/button";
import { InputGroup } from "@/app/components/inputGroup";
import { Form } from "@/app/components/form";
import { Icon } from "@/app/components/icon";
import { Checkbox } from "@/app/components/ui/checkbox";

import {
  faTrashCan,
  faPencil,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import type { Todo } from "./types";

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

  const handleUpdate = handleSubmit(async (values: FieldValues) => {
    try {
      await updateTodo(todo.id, {
        text: values.text,
        completed: todo.completed,
      });

      router.refresh();

      handleEditMode(false);
    } catch (err) {
      console.log(err);
    }
  });

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

  useEffect(() => {
    if (todo.id) {
      setValue("text", todo.text);
    }
  }, [todo, setValue]);

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
            <Button variant="outline" onClick={() => handleEditMode(false)}>
              <Icon icon={faXmark} />
            </Button>
            <Button variant="outline" type="submit">
              <Icon icon={faCheck} />
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
            <Button variant="outline" onClick={() => handleEditMode(true)}>
              <Icon icon={faPencil} />
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Icon icon={faTrashCan} />
            </Button>
          </div>
        </div>
      )}
    </article>
  );
};
