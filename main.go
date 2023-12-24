package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

var port = 3000

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	http.HandleFunc("/api/poet", handlePoet)

	log.Printf("Listening on :%d...", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}

type Poet struct {
	LastName  string `json:"last_name"`
	FirstName string `json:"first_name"`
	BirthYear int    `json:"birth_year"`
}

var poets = []Poet{
	{FirstName: "William", LastName: "Shakespeare", BirthYear: 1564},
	{FirstName: "Edgar Allen", LastName: "Poe", BirthYear: 1809},
}

func handlePoet(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		getPoets(w, r)
	} else if r.Method == "POST" {
		addPoet(w, r)
	}

}

func getPoets(w http.ResponseWriter, r *http.Request) {
	json, err := json.Marshal(poets)
	if err != nil {
		log.Fatal(err)
	}
	w.Write(json)
}

func addPoet(w http.ResponseWriter, r *http.Request) {
	year, err := strconv.Atoi(r.FormValue("birth_year"))
	if err != nil {
		log.Fatal(err)
	}

	poet := Poet{
		FirstName: r.FormValue("first_name"),
		LastName:  r.FormValue("last_name"),
		BirthYear: year,
	}
	poets = append(poets, poet)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}
