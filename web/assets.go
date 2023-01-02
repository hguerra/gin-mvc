package web

import (
	"github.com/gin-gonic/gin"
)

func loadAssets(r *gin.Engine) {
	assetsPath := "web/assets"
	publicPath := "web/public"
	if isDev() {
		assetsPath = "build/web/assets"
		publicPath = "build/web/public"
	}
	r.Static("/assets", assetsPath)
	r.Static("/public", publicPath)
}
