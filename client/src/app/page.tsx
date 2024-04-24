import { TodoItem } from "@/app/components/todo";

import { fetchTodos } from "@/app/services/todos";

import type { Todo } from "@/app/components/todo/types";
import { Input } from "@/app/components/input/Input";
import { Form } from "@/app/components/form";

export const revalidate = 0;

export default async function Home() {
  const todos: Todo[] = await fetchTodos();

  return (
    <main className="m-auto max-w-md">
      <Form>
        <Input />
        <button type="submit">Add</button>
      </Form>
      <section>
        {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </section>
    </main>
  );
}
