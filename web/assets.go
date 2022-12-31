package web

import (
	"github.com/gin-gonic/gin"
)

func loadAssets(r *gin.Engine) {
	r.Static("/assets", "web/assets")
}
