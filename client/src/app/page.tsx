import { TodoItem } from "@/app/components/todo";

import { fetchTodos } from "@/app/services/todos";

import type { Todo } from "@/app/components/todo/types";

export default async function Home() {
  const todos: Todo[] = await fetchTodos();

  return (
    <main>
      <section className="m-auto max-w-md">
        {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </section>
    </main>
  );
}
