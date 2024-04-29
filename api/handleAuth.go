package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
	"golang.org/x/crypto/bcrypt"
)

type Account struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (server *ApiServer) handleUserRegister(w http.ResponseWriter, r *http.Request) error {
	params := Account{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong with decoding",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(params.Password), 10)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong with hashing",
		})
	}

	err = server.store.DB.RegisterUser(r.Context(), database.RegisterUserParams{Email: params.Email, Password: string(hashedPassword)})
	fmt.Println(err)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong with creating a user",
		})
	}

	return WriteJSON(w, http.StatusCreated, ApiGenericResponse{Message: "user created"})
}

func (server *ApiServer) handleUserLogin(w http.ResponseWriter, r *http.Request) error {
	params := Account{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong with json decoder",
		})
	}

	user, err := server.store.DB.FetchUserByEmail(r.Context(), params.Email)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong with getting user from db",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(params.Password))
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "wrong password",
		})
	}

	token, err := createToken(user.ID)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "problem with token creation",
		})
	}

	cookie := http.Cookie{
		Name:     "accessToken",
		Value:    token,
		Path:     "/",
		MaxAge:   86400,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}

	http.SetCookie(w, &cookie)

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{
		Message: "loged in successfully",
	})
}

func (server *ApiServer) handleFetchMe(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)

	user, err := server.store.DB.FetchMe(r.Context(), int32(userId))
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "problem with fetching me from db",
		})
	}

	return WriteJSON(w, http.StatusOK, user)
}
