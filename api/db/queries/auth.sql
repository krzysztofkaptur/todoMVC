-- name: RegisterUser :exec
insert into users (email, password) values ($1, $2);

-- name: FetchMe :one
select id, email from users where id=$1;