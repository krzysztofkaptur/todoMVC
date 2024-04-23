package main

import (
	"fmt"
	"net/http"
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

func (server *ApiServer) Run() {
	router := http.NewServeMux()

	// health check
	router.HandleFunc(createUrl("GET", "/healthcheck"), makeHTTPHandleFunc(server.handleHealthCheck))

	// todos
	router.HandleFunc(createUrl("GET", "/todos"), makeHTTPHandleFunc(server.handleFetchTodos))

	http.ListenAndServe(":"+server.addr, router)
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
		WriteJSON(w, http.StatusBadRequest, ApiError{
			Message: "something went wrong",
		})
	}

	return WriteJSON(w, http.StatusOK, todos)
}
