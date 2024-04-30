package config

import (
	"github.com/joho/godotenv"
	"os"
)

// 初始化配置
func init() {
	IConfig = &Config{}
	IConfig.initConfig()
}

type Config struct {
	mysql MySQL
}

var IConfig *Config

func (c *Config) initConfig() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	c.mysql = MySQL{
		Host:     os.Getenv("MYSQL_HOST"),
		Port:     os.Getenv("MYSQL_PORT"),
		User:     os.Getenv("MYSQL_USER"),
		Password: os.Getenv("MYSQL_PASSWORD"),
		DBName:   os.Getenv("MYSQL_DBNAME"),
	}
}
