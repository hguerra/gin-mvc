package web

import (
	"html/template"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func isDev() bool {
	return os.Getenv("PROFILE") == "dev"
}

func loadTemplateFunc(r *gin.Engine) {
	r.SetFuncMap(template.FuncMap{
		"isDev": isDev,
		"upper": strings.ToUpper,
	})
}
