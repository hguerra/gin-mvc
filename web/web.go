package web

import (
	"html/template"
	"strings"

	"github.com/gin-gonic/gin"
)

func App() {
	r := gin.Default()

	r.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})

	r.Static("/assets", "web/assets")

	r.LoadHTMLGlob("web/views/**/*")

	routes(r)

	r.Run()
}
