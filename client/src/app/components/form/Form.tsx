"use client";

import { FormEvent, ReactNode, useRef } from "react";
import { createTodo } from "@/app/services/todos";

import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
};

export const Form = ({ children }: Props) => {
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    var formData = new FormData(ref.current as HTMLFormElement);

    await createTodo({
      text: formData.get("text") as string,
      completed: false,
    });

    router.refresh();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
