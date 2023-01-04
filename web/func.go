package web

import (
	"html/template"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func IsDev() bool {
	return os.Getenv("PROFILE") == "dev"
}

func loadTemplateFunc(r *gin.Engine) {
	r.SetFuncMap(template.FuncMap{
		"isDev": IsDev,
		"upper": strings.ToUpper,
	})
}
