package main

import (
	"encoding/json"
	"net/http"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
)

func (server *ApiServer) handleFetchTodos(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)

	todos, err := server.store.DB.FetchTodos(r.Context(), int32(userId))
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, todos)
}

func (server *ApiServer) handleCreateTodo(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)
	type parameters struct {
		Text string `json:"text"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	err = server.store.DB.CreateTodo(r.Context(), database.CreateTodoParams{Text: params.Text, AuthorID: int32(userId)})
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusCreated, ApiGenericResponse{
		Message: "todo created",
	})
}

func (server *ApiServer) handleDeleteTodo(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)

	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	todo, err := server.store.DB.FetchTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "can't fetch todo",
		})
	}

	if todo.AuthorID != int32(userId) {
		return WriteJSON(w, http.StatusForbidden, ApiError{
			Error: "wrong user",
		})
	}

	err = server.store.DB.DeleteTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{
		Message: "todo deleted",
	})
}

func (server *ApiServer) handleUpdateTodo(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)

	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	type parameters struct {
		Text      string `json:"text"`
		Completed bool   `json:"completed"`
	}

	params := parameters{}

	err = json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	todo, err := server.store.DB.FetchTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "can't fetch todo",
		})
	}

	if todo.AuthorID != int32(userId) {
		return WriteJSON(w, http.StatusForbidden, ApiError{
			Error: "wrong user",
		})
	}

	err = server.store.DB.UpdateTodo(r.Context(), database.UpdateTodoParams{ID: id, Text: params.Text, Completed: params.Completed})
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{
		Message: "todo updated",
	})
}

func (server *ApiServer) handleFetchTodoById(w http.ResponseWriter, r *http.Request) error {
	userId := getUserIdFromContext(r)

	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	todo, err := server.store.DB.FetchTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Error: "something went wrong",
		})
	}

	if todo.AuthorID != int32(userId) {
		return WriteJSON(w, http.StatusForbidden, ApiError{
			Error: "wrong user",
		})
	}

	return WriteJSON(w, http.StatusOK, todo)
}
