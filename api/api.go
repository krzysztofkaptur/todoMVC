package main

import "net/http"

type ApiServer struct {
	addr string
}

type ApiError struct {
	Message string `json:"message"`
	Code    string `json:"code"`
}

func (server *ApiServer) Run() {
	router := http.NewServeMux()

	router.HandleFunc("GET /api/v1/healthcheck", makeHTTPHandleFunc(server.handleHealthCheck))

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
	return WriteJSON(w, http.StatusOK, struct{ Message string }{Message: "healthCheck"})
}
