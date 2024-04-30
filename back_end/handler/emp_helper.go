package handler

import (
	"back_end/modal"
	"github.com/gin-gonic/gin"
)

func GetEmpsFromContext(context *gin.Context) (modal.Emps, error) {
	var emp modal.Emps
	err := context.BindJSON(&emp)
	if err != nil {
		return modal.Emps{}, err
	}
	return emp, nil
}
