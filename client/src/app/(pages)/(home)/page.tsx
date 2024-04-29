import { TodoItem } from "@/app/components/todo";
import { fetchTodos } from "@/app/services/todos";
import { CreateTodoForm } from "./sections";

import { cookies } from "next/headers";

import type { Todo } from "@/app/components/todo/types";

export const revalidate = 0;

export default async function Home() {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get("accessToken");

  const todos: Todo[] = await fetchTodos(accessTokenCookie!.value);

  return (
    <main className="m-auto max-w-md">
      <CreateTodoForm />
      <section>
        {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </section>
    </main>
  );
}
