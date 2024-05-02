package router

import (
	"back_end/handler/de"
	service "back_end/service/de"
	"github.com/gin-gonic/gin"
)

func RegisterDepart(e *gin.Engine) {
	departService := service.NewDepartService()
	departHandler := de.NewDepartHandler(departService)

	departGroup := e.Group("/depart")
	{
		departGroup.POST("/update", departHandler.UpdateDepart)
		departGroup.GET("/remove/:name", departHandler.RemoveDepart)
		departGroup.GET("/findbyid/:id", departHandler.FindDepartById)
		departGroup.POST("/findall", departHandler.FindAllDepart)
	}
}
