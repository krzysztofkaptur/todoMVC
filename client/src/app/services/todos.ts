import { Todo } from "@/app/components/todo/types";

const baseURL = "http://host.docker.internal/api/v1";

export const fetchTodos = () =>
  fetch(`${baseURL}/todos`).then((res) => res.json());

export const createTodo = (body: Omit<Todo, "id">) =>
  fetch(`${baseURL}/todos`, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteTodo = (id: number) =>
  fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
  });
