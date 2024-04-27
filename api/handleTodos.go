package main

import (
	"encoding/json"
	"net/http"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
)

func (server *ApiServer) handleFetchTodos(w http.ResponseWriter, r *http.Request) error {
	todos, err := server.store.DB.FetchTodos(r.Context())
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, todos)
}

func (server *ApiServer) handleCreateTodo(w http.ResponseWriter, r *http.Request) error {
	type parameters struct {
		Text string `json:"text"`
	}

	params := parameters{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	// todo: get AuthorID from token
	err = server.store.DB.CreateTodo(r.Context(), database.CreateTodoParams{Text: params.Text, AuthorID: 1})
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusCreated, ApiGenericResponse{
		Message: "todo created",
	})
}

func (server *ApiServer) handleDeleteTodo(w http.ResponseWriter, r *http.Request) error {
	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	err = server.store.DB.DeleteTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{
		Message: "todo deleted",
	})
}

func (server *ApiServer) handleUpdateTodo(w http.ResponseWriter, r *http.Request) error {
	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
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
			Message: "something went wrong",
		})
	}

	err = server.store.DB.UpdateTodo(r.Context(), database.UpdateTodoParams{ID: id, Text: params.Text, Completed: params.Completed})
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, ApiGenericResponse{
		Message: "todo updated",
	})
}

func (server *ApiServer) handleFetchTodoById(w http.ResponseWriter, r *http.Request) error {
	id, err := getId(r)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	todo, err := server.store.DB.FetchTodo(r.Context(), id)
	if err != nil {
		return WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, todo)
}
