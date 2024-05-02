package router

import (
	"back_end/handler/cs"
	service "back_end/service/cs"
	"github.com/gin-gonic/gin"
)

func RegisterClassRouter(e *gin.Engine) {
	classService := service.NewClassService()
	classHandler := cs.NewClassHandler(classService)

	classGroup := e.Group("/class")
	{
		classGroup.POST("/update", classHandler.UpdateClass)
		classGroup.GET("/remove/:id", classHandler.RemoveClass)
		classGroup.GET("/findbyid/:id", classHandler.FindClassById)
		classGroup.GET("/findall", classHandler.FindAllClass)
	}
}
