package handler

import (
	"back_end/modal"
	"back_end/service"
	"fmt"
	"github.com/gin-gonic/gin"
)

// /depts
// 查询所有部门
func GetDeparts(c *gin.Context) {
	var departs []modal.Depart
	err := service.GetDeparts(&departs)
	if err != nil {
		c.JSON(200, gin.H{
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

func DeleteDepartById(c *gin.Context) {
	id := c.Param("id")
	err := service.DeleteDepart(id)
	if err != nil {
		c.JSON(200, gin.H{
			"code": 0,
			"msg":  "DeleteDepartById failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "DeleteDepartById success",
		"data": nil,
	})
}

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

type ICreateD struct {
	Name string `json:"name"`
}

// 创建部门
func CreateDepart(c *gin.Context) {
	var depart *ICreateD
	err := c.BindJSON(&depart)
	name := depart.Name
	fmt.Println(name)

	err = service.CreateDepart(name)

	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "CreateDepart failed",
			"data": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "CreateDepart success",
		"data": nil,
	})

}

// 更新部门
//> 请求路径：/depts
//>
//> 请求方式：PUT
//>
//> 接口描述：该接口用于修改部门数据

func UpdateDepart(c *gin.Context) {
	//id 和 name
	id := c.Param("id")
	name := c.Param("name")

	depart, err := service.FindById(id)

	if err != nil {
		c.JSON(200, gin.H{
			"code": 0,
			"msg":  "FindDepartById failed",
			"data": err,
		})
		return
	}

	depart.Name = name

	err = service.UpdateDepart(depart)

	if err != nil {
		c.JSON(200, gin.H{
			"code": 0,
			"msg":  "UpdateDepart failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "UpdateDepart success",
		"data": nil,
	})

}
