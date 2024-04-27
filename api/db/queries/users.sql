-- name: FetchUserByEmail :one
select id, email, password from users where email=$1;