package utils

import "github.com/gin-gonic/gin"

type ResCode int

const (
	SUCCESS_CODE ResCode = 1
	ERROR_CODE   ResCode = 0
)

type ResBody struct {
	Code ResCode     `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

func (res ResBody) GetRes() map[string]interface{} {
	return gin.H{
		"code": res.Code,
		"msg":  res.Msg,
		"data": res.Data,
	}
}
