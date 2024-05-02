package de

import (
	modal "back_end/modal/de"
	service "back_end/service/de"
	"github.com/gin-gonic/gin"
)

type DepartHandler struct {
	departService service.IDepart
}

func NewDepartHandler(departService service.IDepart) *DepartHandler {
	return &DepartHandler{
		departService: departService,
	}
}

func (h *DepartHandler) UpdateDepart(ctx *gin.Context) {
	var err error
	var depart modal.Depart
	err = ctx.ShouldBindJSON(&depart)
	err = h.departService.UpdateDepart(&depart)
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
			"data": depart,
		})
	}
}

func (h *DepartHandler) RemoveDepart(ctx *gin.Context) {
	var err error
	name := ctx.Param("name")
	err = h.departService.RemoveDepart(name)
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
			"data": name,
		})
	}
}

func (h *DepartHandler) FindDepartById(ctx *gin.Context) {
	var err error
	var depart modal.Depart
	id := ctx.Param("id")
	err = h.departService.FindDepartById(id, &depart)
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
			"data": depart,
		})
	}
}

func (h *DepartHandler) FindAllDepart(ctx *gin.Context) {
	var err error
	var departs []modal.Depart
	err = h.departService.FindAllDepart(&departs)
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
			"data": departs,
		})
	}
}
