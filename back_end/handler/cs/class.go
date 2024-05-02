package cs

import (
	modal "back_end/modal/cs"
	service "back_end/service/cs"
	"github.com/gin-gonic/gin"
)

type ClassHandler struct {
	chatService service.IClass
}

func NewClassHandler(classService service.IClass) *ClassHandler {
	return &ClassHandler{
		chatService: classService,
	}
}

func (c ClassHandler) UpdateClass(context *gin.Context) {
	var err error
	var class modal.Class
	err = context.ShouldBindJSON(&class)
	err = c.chatService.UpdateClass(&class)
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
			"data": class,
		})
	}
}

func (c ClassHandler) RemoveClass(context *gin.Context) {
	var err error
	id := context.Param("id")
	err = c.chatService.RemoveClass(id)
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

func (c ClassHandler) FindClassById(context *gin.Context) {
	var err error
	var class modal.Class
	id := context.Param("id")
	err = c.chatService.FindClassById(id, &class)
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
			"data": class,
		})
	}
}

func (c ClassHandler) FindAllClass(context *gin.Context) {
	var err error
	var classes []modal.Class
	err = c.chatService.FindAllClass(&classes)
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
			"data": classes,
		})
	}
}
