import type { Todo } from "./types";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props): JSX.Element => {
  return (
    <article className="m-4 flex justify-between gap-4 p-4">
      <div className="flex gap-4">
        <input type="checkbox" />
        <span>{todo.text}</span>
      </div>
      <button>delete</button>
    </article>
  );
};
