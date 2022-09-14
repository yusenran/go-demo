
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Hello struct {
	Greeting string `json:"greeting"`
	Content string `json:"content"`
	Count int `json:"count"`
}

var hello *Hello = &Hello{
	Greeting: "Hello",
	Content: "World",
	Count: 0,
}

func main() {
	// http.HandleFunc("/", echoHello)
	// http.HandleFunc("/echo", echoHello)
	// http.HandleFunc("/go-demo/hello", helloJson)
	http.HandleFunc("/go-demo/avatar", syncAvatar)
	http.ListenAndServe(":3000", nil)
}

func echoHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello World</h1>")
}

func helloJson(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "GET":
		w.Header().Set("Content-Type", "application/json")
		j, _ := json.Marshal(hello)
		w.Write(j)
	case "POST":
		d := json.NewDecoder(r.Body)
		p := &Hello{}
		err := d.Decode(p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		hello = p
		j, _ := json.Marshal(hello)
		w.Write(j)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "unsupported")
	}
}
