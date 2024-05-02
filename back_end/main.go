package main

import (
	"back_end/config"
	"back_end/internal/router"
	modal3 "back_end/modal/auth"
	modal2 "back_end/modal/cs"
	modal "back_end/modal/de"
	"github.com/gin-gonic/gin"
)

func init() {
	var err error
	err = config.IConfig.Db.AutoMigrate(&modal.Depart{})
	err = config.IConfig.Db.AutoMigrate(&modal.Emps{})
	err = config.IConfig.Db.AutoMigrate(modal2.Class{})
	err = config.IConfig.Db.AutoMigrate(modal2.Student{})
	err = config.IConfig.Db.AutoMigrate(modal3.User{})

	user := modal3.User{Username: "admin", Password: "admin"}

	//给user添加两条数据
	config.IConfig.Db.Save(user)

	if err != nil {
		panic("数据库迁移失败：" + err.Error())
	}
}

func main() {
	// Create a new instance of the application
	r := gin.Default()

	router.ConfigRouter(r)

	r.Run() // 监听并在 0.0.0.0:8080 上启动服务
}
