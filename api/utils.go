package main

import (
	"fmt"
	"net/http"
	"strconv"
)

func makeHTTPHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := f(w, r)
		if err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{
				Error: "something went wrong",
			})
		}
	}
}

func getId(r *http.Request) (int32, error) {
	strId := r.PathValue("id")
	str, err := strconv.Atoi(strId)
	if err != nil {
		return 0, err
	}

	return int32(str), nil
}

func createUrl(method string, path string) string {
	return fmt.Sprintf("%v %v%v", method, BASE_URL, path)
}

func getUserIdFromContext(r *http.Request) int {
	ctx := r.Context()

	userId := ctx.Value(ctxKeyRequestID)

	return userId.(int)
}
