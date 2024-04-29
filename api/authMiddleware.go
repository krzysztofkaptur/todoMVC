package main

import (
	"context"
	"net/http"
)

type key int

const (
	ctxKeyRequestID key = iota
)

func authMiddleware(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userId, err := GetUserIdFromToken(r)
		if err != nil {
			WriteJSON(w, http.StatusForbidden, ApiError{Error: "access denied"})
			return
		}

		ctx := context.WithValue(r.Context(), ctxKeyRequestID, userId)

		handler(w, r.WithContext(ctx))
	}
}
