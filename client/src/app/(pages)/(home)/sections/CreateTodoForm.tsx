"use client";

import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTodo } from "@/app/services/todos";
import { addTodoSchema } from "@/app/libs/validation";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/form";
import { InputGroup } from "@/app/components/inputGroup";
import { Icon } from "@/app/components/icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const onSubmit = handleSubmit(async (values: FieldValues) => {
    await createTodo({
      text: values.text,
      completed: false,
    });

    reset();

    router.refresh();
  });

  return (
    <Form onSubmit={onSubmit} className="justify-between">
      <InputGroup
        {...register("text")}
        error={errors.text?.message as string}
      />
      <Button type="submit">
        <Icon icon={faPlus} />
      </Button>
    </Form>
  );
};
