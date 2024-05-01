export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  author_id: number;
};

export type CreateTodo = Omit<Todo, "id" | "author_id">;
