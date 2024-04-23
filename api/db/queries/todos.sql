-- name: FetchTodos :many
select * from todos;

-- name: FetchTodo :one
select * from todos where id=$1;

-- name: CreateTodo :exec
insert into todos (text) values ($1);

-- name: DeleteTodo :exec
delete from todos where id=$1;

-- name: UpdateTodo :exec
update todos set text=coalesce($2, text), completed=coalesce($3, completed) where id=$1;