-- name: FetchTodos :many
select * from todos;

-- name: CreateTodo :exec
insert into todos (text) values ($1);

-- name: DeleteTodo :exec
delete from todos where id=$1;