package web

import (
	"github.com/gin-gonic/gin"
	"log"
)

func App() {
	r := gin.Default()

	loadTemplateFunc(r)

	loadAssets(r)

	loadViews(r)

	loadRoutes(r)

	err := r.Run()
	if err != nil {
		log.Fatal(err)
	}
}
