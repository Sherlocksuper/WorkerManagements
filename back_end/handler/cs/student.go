package cs

import (
	modal "back_end/modal/cs"
	service "back_end/service/cs"
	"github.com/gin-gonic/gin"
)

type StudentHandler struct {
	studentService service.IStudent
}

func NewStudentHandler(studentService service.IStudent) *StudentHandler {
	return &StudentHandler{studentService: studentService}
}

func (h *StudentHandler) UpdateStudent(context *gin.Context) {
	var err error
	var student modal.Student
	err = context.ShouldBindJSON(&student)
	err = h.studentService.UpdateStudent(&student)
	if err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		context.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": student,
		})
	}
}

func (h *StudentHandler) RemoveStudent(context *gin.Context) {
	var err error
	id := context.Param("id")
	err = h.studentService.RemoveStudent(id)
	if err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		context.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": id,
		})
	}
}

func (h *StudentHandler) FindStudentById(context *gin.Context) {
	var err error
	var student modal.Student
	id := context.Param("id")
	err = h.studentService.FindStudentById(id, &student)
	if err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		context.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": student,
		})
	}
}

func (h *StudentHandler) FindAllStudent(context *gin.Context) {

	var search modal.StudentSearch
	var err error
	err = context.ShouldBindJSON(&search)

	var students []modal.Student
	err = h.studentService.FindAllStudent(&students, &search)
	if err != nil {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		context.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": students,
		})
	}
}
