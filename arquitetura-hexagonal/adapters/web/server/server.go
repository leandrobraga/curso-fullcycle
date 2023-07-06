package server

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/leandrobraga/curso-fullcycle/arquitetura-hexagonal/application"
	"github.com/urfave/negroni"
)

type WebServer struct {
	Service application.ProductServiceInterface
}

func MakeNewWebserver() *WebServer {
	return &WebServer{}
}

func (w WebServer) Serve() {

	r := mux.NewRouter()
	n := negroni.New()

	server := &http.Server{
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      10 * time.Second,
		Addr:              ":8080",
		Handler:           nil,
		ErrorLog:          log.New(os.Stderr, "log: ", log.Lshortfile),
	}

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
