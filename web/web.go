package web

import (
	"github.com/gin-gonic/gin"
)

func App() {
	r := gin.Default()

	loadTemplateFunc(r)

	loadAssets(r)

	loadViews(r)

	loadRoutes(r)

	r.Run()
}
