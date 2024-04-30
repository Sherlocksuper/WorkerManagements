package handler

import (
	"back_end/service"
	"github.com/gin-gonic/gin"
)

// /depts
// 查询所有部门

func GetDeparts(c *gin.Context) {
	departs, err := service.GetDeparts()
	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "GetDeparts failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "GetDeparts success",
		"data": departs,
	})
}

// /depts/{id}
func FindDepartById(c *gin.Context) {
	id := c.Param("id")
	depart, err := service.FindEmpById(id)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "GetDepart failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "GetDepart success",
		"data": depart,
	})
}

func CreateDepart(c *gin.Context) {
	name := c.Param("name")

	err := service.CreateDepart(name)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "CreateDepart failed",
			"data": err,
		})
		return
	}
}
