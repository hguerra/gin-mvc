package web

import (
	"github.com/gin-gonic/gin"
)

func loadAssets(r *gin.Engine) {
	assetsPath := "web/assets"
	if isDev() {
		assetsPath = "build/web/assets"
	}
	r.Static("/assets", assetsPath)
	r.Static("/public", "web/public")
}
