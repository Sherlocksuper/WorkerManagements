package router

import (
	"back_end/handler"
	"github.com/gin-gonic/gin"
)

func RegisterDepart(e *gin.Engine) {
	e.GET("/depts", handler.GetDeparts)
	e.DELETE("/depts/:id", handler.DeleteDepartById)
	e.POST("/depts", handler.CreateDepart)
	e.GET("/depts/:id", handler.FindDepartById)
	e.PUT("/depts", handler.UpdateDepart)
}
