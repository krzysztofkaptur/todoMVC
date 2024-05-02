import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { TodoItem } from "@/app/components/todo";
import { fetchTodos } from "@/app/services/todos";

import { CreateTodoForm } from "./sections";

import type { Todo } from "@/app/components/todo/types";

export const revalidate = 0;

export default async function Home() {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accessToken");

  if (!accessTokenCookie) {
    redirect("/auth/login");
  }

  const todos: Todo[] = await fetchTodos(accessTokenCookie!.value);

  return (
    <>
      <CreateTodoForm />

      <section>
        {Array.isArray(todos) &&
          todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </section>
    </>
  );
}
