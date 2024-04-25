import { TodoItem } from "@/app/components/todo";
import { fetchTodos } from "@/app/services/todos";
import { Form } from "@/app/components/form";

import type { Todo } from "@/app/components/todo/types";

export const revalidate = 0;

export default async function Home() {
  const todos: Todo[] = await fetchTodos();

  return (
    <main className="m-auto max-w-md">
      <Form />
      <section>
        {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </section>
    </main>
  );
}
