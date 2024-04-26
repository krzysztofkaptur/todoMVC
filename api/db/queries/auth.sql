-- name: RegisterUser :exec
insert into users (email, password) values ($1, $2);