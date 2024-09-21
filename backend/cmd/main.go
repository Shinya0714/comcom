package main

import (
	"amen_hallelujah_peanutButter/comcom/backend/internal/interface/handler"
	"log"
	"net/http"

	"golang.org/x/net/websocket"
)

func main() {
	http.Handle("/ws", websocket.Handler(handler.WebSocketHandler))

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("http.ListenAndServe:", err)
	}
}
