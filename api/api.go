package main

import (
	"net/http"

	"github.com/rs/cors"
)

type ApiServer struct {
	addr  string
	store ApiConfig
}

type ApiError struct {
	Error string `json:"message"`
	Code  string `json:"code"`
}

type ApiGenericResponse struct {
	Message string `json:"message"`
}

const (
	BASE_URL = "/api/v1"
)

// cors.Default() setup the middleware with default options being
// all origins accepted with simple methods (GET, POST). See
// documentation below for more options.

func (server *ApiServer) Run() {
	router := http.NewServeMux()
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPatch},
		AllowCredentials: true,
	}).Handler(router)

	// health check
	router.HandleFunc(createUrl(http.MethodGet, "/healthcheck"), makeHTTPHandleFunc(server.handleHealthCheck))

	// todos
	router.HandleFunc(createUrl(http.MethodGet, "/todos"), authMiddleware(makeHTTPHandleFunc(server.handleFetchTodos)))
	router.HandleFunc(createUrl(http.MethodPost, "/todos"), authMiddleware(makeHTTPHandleFunc(server.handleCreateTodo)))
	router.HandleFunc(createUrl(http.MethodDelete, "/todos/{id}"), authMiddleware(makeHTTPHandleFunc(server.handleDeleteTodo)))
	router.HandleFunc(createUrl(http.MethodPatch, "/todos/{id}"), authMiddleware(makeHTTPHandleFunc(server.handleUpdateTodo)))
	router.HandleFunc(createUrl(http.MethodGet, "/todos/{id}"), authMiddleware(makeHTTPHandleFunc(server.handleFetchTodoById)))

	// auth
	router.HandleFunc(createUrl(http.MethodPost, "/auth/register"), makeHTTPHandleFunc(server.handleUserRegister))
	router.HandleFunc(createUrl(http.MethodPost, "/auth/login"), makeHTTPHandleFunc(server.handleUserLogin))
	router.HandleFunc(createUrl(http.MethodGet, "/auth/me"), authMiddleware(makeHTTPHandleFunc(server.handleFetchMe)))

	http.ListenAndServe(":"+server.addr, handler)
}

func (server *ApiServer) handleHealthCheck(w http.ResponseWriter, r *http.Request) error {
	return WriteJSON(w, http.StatusOK, ApiGenericResponse{Message: "healthCheck"})
}
