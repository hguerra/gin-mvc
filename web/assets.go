package web

import (
	"github.com/gin-gonic/gin"
	"os"
)

func loadAssets(r *gin.Engine) {
	assetsPath := "web/assets"
	if os.Getenv("PROFILE") == "dev" {
		assetsPath = "build/web/assets"
	}
	r.Static("/assets", assetsPath)
}
