import { Todo } from "@/app/components/todo/types";

const baseURL = "http://host.docker.internal/api/v1";

export const fetchTodos = () =>
  fetch(`${baseURL}/todos`, {
    next: {
      tags: ["todos"],
    },
  }).then((res) => res.json());

export const createTodo = (body: Omit<Todo, "id">) =>
  fetch(`${baseURL}/todos`, {
    method: "POST",
    body: JSON.stringify(body),
  });
