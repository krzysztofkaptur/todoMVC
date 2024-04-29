import { CreateTodo } from "@/app/components/todo/types";

const baseURL = "http://localhost:3000/api/todos";

export const fetchTodos = (cookie: string) =>
  fetch(baseURL, {
    credentials: "include",
    headers: {
      Cookie: `accessToken=${cookie}`,
    },
  }).then((res) => res.json());

export const createTodo = (body: CreateTodo) =>
  fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteTodo = (id: number) =>
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });

export const updateTodo = (id: number, body: CreateTodo) =>
  fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
