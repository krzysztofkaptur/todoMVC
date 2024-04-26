package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
	"golang.org/x/crypto/bcrypt"
)

func (server *ApiServer) handleUserRegister(w http.ResponseWriter, r *http.Request) error {
	type parameters struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong with decoding",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), 10)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong with hashing",
		})
	}

	err = server.store.DB.RegisterUser(r.Context(), database.RegisterUserParams{Email: params.Email, Password: string(hashedPassword)})
	fmt.Println(err)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong with creating a user",
		})
	}

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{Message: "user created"})
}
