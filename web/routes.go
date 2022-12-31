package web

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func loadRoutes(r *gin.Engine) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "home/index.tmpl", gin.H{
			"title":   "Main website",
			"content": "This is an index page...",
		})
	})

	r.GET("/about", func(c *gin.Context) {
		c.HTML(http.StatusOK, "about/index.tmpl", gin.H{
			"title":   "About",
			"content": "This is an about page...",
		})
	})

	r.GET("/posts", func(c *gin.Context) {
		c.HTML(http.StatusOK, "posts/index.tmpl", gin.H{
			"title":   "Posts",
			"content": "This is an index page...",
		})
	})

	r.GET("/users", func(c *gin.Context) {
		c.HTML(http.StatusOK, "users/index.tmpl", gin.H{
			"title": "Users",
		})
	})
}
