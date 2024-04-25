package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
	"github.com/rs/cors"
)

type ApiServer struct {
	addr  string
	store ApiConfig
}

type ApiError struct {
	Message string `json:"message"`
	Code    string `json:"code"`
}

type ApiGenericResponse struct {
	Message string `json:"message"`
}

const (
	BASE_URL = "/api/v1"
)

func createUrl(method string, path string) string {
	return fmt.Sprintf("%v %v%v", method, BASE_URL, path)
}

// cors.Default() setup the middleware with default options being
// all origins accepted with simple methods (GET, POST). See
// documentation below for more options.

func (server *ApiServer) Run() {
	router := http.NewServeMux()
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPatch},
		AllowCredentials: true,
	}).Handler(router)

	// health check
	router.HandleFunc(createUrl(http.MethodGet, "/healthcheck"), makeHTTPHandleFunc(server.handleHealthCheck))

	// todos
	router.HandleFunc(createUrl(http.MethodGet, "/todos"), makeHTTPHandleFunc(server.handleFetchTodos))
	router.HandleFunc(createUrl(http.MethodPost, "/todos"), makeHTTPHandleFunc(server.handleCreateTodo))
	router.HandleFunc(createUrl(http.MethodDelete, "/todos/{id}"), makeHTTPHandleFunc(server.handleDeleteTodo))
	router.HandleFunc(createUrl(http.MethodPatch, "/todos/{id}"), makeHTTPHandleFunc(server.handleUpdateTodo))
	router.HandleFunc(createUrl(http.MethodGet, "/todos/{id}"), makeHTTPHandleFunc(server.handleFetchTodoById))

	http.ListenAndServe(":"+server.addr, handler)
}

func makeHTTPHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := f(w, r)
		if err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{
				Message: "something went wrong",
			})
		}
	}
}

func (server *ApiServer) handleHealthCheck(w http.ResponseWriter, r *http.Request) error {
	return WriteJSON(w, http.StatusOK, ApiGenericResponse{Message: "healthCheck"})
}

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

	err = server.store.DB.CreateTodo(r.Context(), params.Text)
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

func getId(r *http.Request) (int32, error) {
	strId := r.PathValue("id")
	str, err := strconv.Atoi(strId)
	if err != nil {
		return 0, err
	}

	return int32(str), nil
}
