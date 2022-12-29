package web

import "github.com/gin-gonic/gin"

func loadViews(r *gin.Engine) {
	r.LoadHTMLGlob("web/views/**/*")
}
