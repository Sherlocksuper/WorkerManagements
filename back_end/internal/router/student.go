package router

import (
	"back_end/handler/cs"
	service "back_end/service/cs"
	"github.com/gin-gonic/gin"
)

func RegisterStudentRouter(e *gin.Engine) {
	studentService := service.NewStudentService()
	studentHandler := cs.NewStudentHandler(studentService)

	studentGroup := e.Group("/student")
	{
		studentGroup.POST("/update", studentHandler.UpdateStudent)
		studentGroup.GET("/remove/:id", studentHandler.RemoveStudent)
		studentGroup.GET("/findbyid/:id", studentHandler.FindStudentById)
		studentGroup.GET("/findall", studentHandler.FindAllStudent)
	}
}
