package main

import (
	"log"

	"github.com/joho/godotenv"
)

func InitEnv() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
