package router

import (
	"back_end/handler/auth"
	"github.com/gin-gonic/gin"
)

func RegisterAuth(e *gin.Engine) {
	e.POST("/login", auth.Login)
}
