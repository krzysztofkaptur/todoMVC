-- name: FetchTodos :many
select * from todos where author_id=$1 order by id desc;

-- name: FetchTodo :one
select * from todos where id=$1;

-- name: CreateTodo :exec
insert into todos (text, author_id) values ($1, $2);

-- name: DeleteTodo :exec
delete from todos where id=$1;

-- name: UpdateTodo :exec
update todos set text=coalesce($2, text), completed=coalesce($3, completed) where id=$1;