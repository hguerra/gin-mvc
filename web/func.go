package web

import (
	"html/template"
	"strings"

	"github.com/gin-gonic/gin"
)

func loadTemplateFunc(r *gin.Engine) {
	r.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})
}
