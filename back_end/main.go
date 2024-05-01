package main

import (
	"back_end/config"
	"back_end/internal/router"
	"back_end/modal/de"
	"github.com/gin-gonic/gin"
)

func init() {
	var err error
	err = config.IConfig.Db.AutoMigrate(&modal.Depart{})
	err = config.IConfig.Db.AutoMigrate(&modal.Emps{})
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
