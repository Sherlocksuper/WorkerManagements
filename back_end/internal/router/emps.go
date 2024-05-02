package router

import (
	"back_end/handler/de"
	service "back_end/service/de"
	"github.com/gin-gonic/gin"
)

func RegisterEmp(e *gin.Engine) {
	empService := service.NewEmpService()
	empHandler := de.NewEmpHandler(empService)

	empGroup := e.Group("/emp")
	{
		empGroup.POST("/update", empHandler.UpdateEmp)
		empGroup.GET("/remove/:id", empHandler.RemoveEmp)
		empGroup.GET("/findbyid/:id", empHandler.FindEmpById)
		empGroup.POST("/findall", empHandler.FindAllEmp)
	}
}
