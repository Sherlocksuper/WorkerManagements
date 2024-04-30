package handler

import (
	"back_end/modal"
	"github.com/gin-gonic/gin"
)

func GetDeptFromContext(context *gin.Context) (modal.Depart, error) {
	var depart modal.Depart
	err := context.BindJSON(&depart)
	if err != nil {
		return modal.Depart{}, err
	}
	return depart, nil
}
