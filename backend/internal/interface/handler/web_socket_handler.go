package handler

import (
	"log"

	"golang.org/x/net/websocket"
)

var clients = make(map[*websocket.Conn]bool)

func WebSocketHandler(ws *websocket.Conn) {
	defer ws.Close()
	clients[ws] = true

	for {
		var message string
		if err := websocket.Message.Receive(ws, &message); err != nil {
			log.Println("Receive error:", err)
			delete(clients, ws)
			break
		}
		log.Printf("Received message: %s\n", message)

		for client := range clients {
			if err := websocket.Message.Send(client, message); err != nil {
				log.Println("Send error:", err)
			}
		}
	}
}
