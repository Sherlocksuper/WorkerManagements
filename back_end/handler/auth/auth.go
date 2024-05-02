package auth

import (
	"back_end/config"
	modal "back_end/modal/auth"
	token2 "back_end/service/token"
	"github.com/gin-gonic/gin"
)

func Login(context *gin.Context) {
	user := modal.User{}
	context.BindJSON(&user)

	targetUser := modal.User{}
	config.IConfig.Db.Find(targetUser, user.Username)

	if targetUser.Password != user.Password {
		context.JSON(200, gin.H{
			"code": 0,
			"msg":  "failed",
			"data": "wrong password",
		})
		return
	}
	tokenStruct := token2.TokenStruct{
		Username: user.Username,
		Password: user.Password,
	}

	tokenStrign := token2.GenerateToken(tokenStruct)

	context.JSON(200, gin.H{
		"code": 1,
		"msg":  "success",
		"data": tokenStrign,
	})
}
