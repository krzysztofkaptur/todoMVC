export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type CreateTodo = Omit<Todo, "id">;
