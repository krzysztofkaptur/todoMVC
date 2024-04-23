package main

import (
	"log"
	"net/http"
	"os"

	"github.com/krzysztofkaptur/todoMVC/internals/database"
)

type apiFunc func(http.ResponseWriter, *http.Request) error

type ApiConfig struct {
	DB *database.Queries
}

func main() {
	InitEnv()

	db, err := InitDB()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	server := ApiServer{
		addr:  os.Getenv("PORT"),
		store: db,
	}

	server.Run()
}
