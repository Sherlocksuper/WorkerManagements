package de

import (
	modal "back_end/modal/de"
	service "back_end/service/de"
	"fmt"
	"github.com/gin-gonic/gin"
)

type EmpHandler struct {
	empService service.IEmpType
}

func NewEmpHandler(empService service.IEmpType) *EmpHandler {
	return &EmpHandler{empService: empService}
}

func (h *EmpHandler) UpdateEmp(ctx *gin.Context) {
	var err error
	var emp modal.Emps
	err = ctx.ShouldBindJSON(&emp)
	err = h.empService.UpdateEmp(&emp)
	if err != nil {
		ctx.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
		return
	} else {
		ctx.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": emp,
		})
	}
}

func (h *EmpHandler) RemoveEmp(ctx *gin.Context) {
	id := ctx.Param("id")
	err := h.empService.RemoveEmp(id)
	if err != nil {
		ctx.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		ctx.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": id,
		})
	}
}

func (h *EmpHandler) FindEmpById(ctx *gin.Context) {
	id := ctx.Param("id")
	var emp modal.Emps
	err := h.empService.FindEmpById(id, &emp)
	if err != nil {
		ctx.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		ctx.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": emp,
		})
	}
}

func (h *EmpHandler) FindAllEmp(ctx *gin.Context) {

	var search modal.EmpsSearch
	err := ctx.BindJSON(&search)

	fmt.Println("here")
	fmt.Println(search.Gender)
	fmt.Println(search.Name)

	var emps []modal.Emps
	err = h.empService.FindAllEmp(&emps, &search)

	if err != nil {
		ctx.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": err,
		})
	} else {
		ctx.JSON(200, gin.H{
			"code": 1,
			"msg":  "success",
			"data": emps,
		})
	}
}
