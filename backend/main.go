
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", echoHello)
	http.ListenAndServe(":3000", nil)
}

func echoHello(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8000")
	fmt.Fprintf(w, "<h1>Hello World</h1>")
}