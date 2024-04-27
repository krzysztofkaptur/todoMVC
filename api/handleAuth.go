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

	return WriteJSON(w, http.StatusCreated, ApiGenericResponse{Message: "user created"})
}

func (server *ApiServer) handleUserLogin(w http.ResponseWriter, r *http.Request) error {
	type parameters struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong with json decoder",
		})
	}

	user, err := server.store.DB.FetchUserByEmail(r.Context(), params.Email)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong with getting user from db",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Password))
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "wrong password",
		})
	}

	token, err := createToken(user.ID)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "problem with token creation",
		})
	}

	type loginResponse struct {
		AccessToken string `json:"access_token"`
	}

	return WriteJSON(w, http.StatusOK, loginResponse{
		AccessToken: token,
	})
}
