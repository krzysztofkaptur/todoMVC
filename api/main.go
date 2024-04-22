package main

import (
	"net/http"
	"strconv"
)

type apiFunc func(http.ResponseWriter, *http.Request) error

func main() {
	server := ApiServer{
		addr: strconv.Itoa(80),
	}

	server.Run()
}
