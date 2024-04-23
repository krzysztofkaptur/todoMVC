// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: todos.sql

package database

import (
	"context"
)

const createTodo = `-- name: CreateTodo :exec
insert into todos (text) values ($1)
`

func (q *Queries) CreateTodo(ctx context.Context, text string) error {
	_, err := q.db.ExecContext(ctx, createTodo, text)
	return err
}

const deleteTodo = `-- name: DeleteTodo :exec
delete from todos where id=$1
`

func (q *Queries) DeleteTodo(ctx context.Context, id int32) error {
	_, err := q.db.ExecContext(ctx, deleteTodo, id)
	return err
}

const fetchTodos = `-- name: FetchTodos :many
select id, text, completed from todos
`

func (q *Queries) FetchTodos(ctx context.Context) ([]Todo, error) {
	rows, err := q.db.QueryContext(ctx, fetchTodos)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Todo
	for rows.Next() {
		var i Todo
		if err := rows.Scan(&i.ID, &i.Text, &i.Completed); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateTodo = `-- name: UpdateTodo :exec
update todos set text=coalesce($2, text), completed=coalesce($3, completed) where id=$1
`

type UpdateTodoParams struct {
	ID        int32
	Text      string
	Completed bool
}

func (q *Queries) UpdateTodo(ctx context.Context, arg UpdateTodoParams) error {
	_, err := q.db.ExecContext(ctx, updateTodo, arg.ID, arg.Text, arg.Completed)
	return err
}
