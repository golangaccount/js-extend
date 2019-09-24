package main

import (
	"fmt"
	"net/http"

	"github.com/Unknwon/macaron"
)

func main() {
	m := macaron.New()
	m.Use(macaron.Static("./"))
	err := http.ListenAndServe("0.0.0.0:30000", m)
	if err != nil {
		fmt.Println(err.Error())
	}
}
