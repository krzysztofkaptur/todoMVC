// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: auth.sql

package database

import (
	"context"
)

const registerUser = `-- name: RegisterUser :exec
insert into users (email, password) values ($1, $2)
`

type RegisterUserParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (q *Queries) RegisterUser(ctx context.Context, arg RegisterUserParams) error {
	_, err := q.db.ExecContext(ctx, registerUser, arg.Email, arg.Password)
	return err
}
