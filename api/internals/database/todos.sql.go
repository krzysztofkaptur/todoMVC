// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: todos.sql

package database

import (
	"context"
)

const createTodo = `-- name: CreateTodo :exec
insert into todos (text, author_id) values ($1, $2)
`

type CreateTodoParams struct {
	Text     string `json:"text"`
	AuthorID int32  `json:"author_id"`
}

func (q *Queries) CreateTodo(ctx context.Context, arg CreateTodoParams) error {
	_, err := q.db.ExecContext(ctx, createTodo, arg.Text, arg.AuthorID)
	return err
}

const deleteTodo = `-- name: DeleteTodo :exec
delete from todos where id=$1
`

func (q *Queries) DeleteTodo(ctx context.Context, id int32) error {
	_, err := q.db.ExecContext(ctx, deleteTodo, id)
	return err
}

const fetchTodo = `-- name: FetchTodo :one
select id, text, completed, author_id from todos where id=$1
`

func (q *Queries) FetchTodo(ctx context.Context, id int32) (Todo, error) {
	row := q.db.QueryRowContext(ctx, fetchTodo, id)
	var i Todo
	err := row.Scan(
		&i.ID,
		&i.Text,
		&i.Completed,
		&i.AuthorID,
	)
	return i, err
}

const fetchTodos = `-- name: FetchTodos :many
select id, text, completed, author_id from todos where author_id=$1 order by id desc
`

func (q *Queries) FetchTodos(ctx context.Context, authorID int32) ([]Todo, error) {
	rows, err := q.db.QueryContext(ctx, fetchTodos, authorID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Todo
	for rows.Next() {
		var i Todo
		if err := rows.Scan(
			&i.ID,
			&i.Text,
			&i.Completed,
			&i.AuthorID,
		); err != nil {
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
	ID        int32  `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

func (q *Queries) UpdateTodo(ctx context.Context, arg UpdateTodoParams) error {
	_, err := q.db.ExecContext(ctx, updateTodo, arg.ID, arg.Text, arg.Completed)
	return err
}
