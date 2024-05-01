package router

import (
	"back_end/handler"
	"github.com/gin-gonic/gin"
)

func RegisterEmps(e *gin.Engine) {

	e.GET("/emps", handler.GetEmps)
	e.DELETE("/emps/:id", handler.DeleteEmpsById)
	e.POST("/emps", handler.CreateEmp)
	e.GET("/emps/:id", handler.FindEmpById)
	e.PUT("/emps", handler.UpdateEmps)
}
