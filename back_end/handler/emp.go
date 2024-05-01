package handler

import (
	"back_end/modal"
	"back_end/service"
	"github.com/gin-gonic/gin"
)

//> 请求路径：/emps
//>
//> 请求方式：GET
//>
//> 接口描述：该接口用于员工列表数据的条件分页查询

func GetEmps(c *gin.Context) {
	var departs []modal.Emps
	err := service.GetEmps(&departs)
	if err != nil {
		c.JSON(200, gin.H{
			"code": 0,
			"msg":  "GetEmps failed",
			"data": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "GetEmps success",
		"data": departs,
	})
}

func DeleteEmpsById(c *gin.Context) {
	id := c.Param("id")
	err := service.DeleteEmp(id)
	if err != nil {
		c.JSON(200, gin.H{
			"code": 0,
			"msg":  "DeleteEmpsById failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "DeleteEmpsById success",
		"data": nil,
	})
}

func CreateEmp(c *gin.Context) {
	var emp modal.Emps
	err := c.BindJSON(&emp)

	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "CreateEmp failed",
			"data": err,
		})
		return
	}

	err = service.AddEmp(&emp)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "CreateEmp failed",
			"data": err,
		})
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "CreateEmp success",
		"data": nil,
	})
}

func FindEmpById(c *gin.Context) {
	id := c.Param("id")
	emp, err := service.FindEmpById(id)

	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "FindEmpById failed",
			"data": err,
		})
		return
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "FindEmpById success",
		"data": emp,
	})
}

func UpdateEmps(c *gin.Context) {

	var emp modal.Emps
	err := c.BindJSON(&emp)

	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "UpdateEmps failed",
			"data": err,
		})
		return
	}

	err = service.UpdateEmp(emp)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 0,
			"msg":  "UpdateEmps failed",
			"data": err,
		})
	}

	c.JSON(200, gin.H{
		"code": 1,
		"msg":  "UpdateEmps success",
		"data": nil,
	})
}
