package config

import (
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func init() {
	IConfig.initConfig()
}

var IConfig = &Config{}

type Config struct {
	Mysql *MySQL
	Db    *gorm.DB
}

func (c *Config) initConfig() {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}
	c.Mysql = &MySQL{
		//Host:     os.Getenv("MYSQL_HOST"),
		//Port:     os.Getenv("MYSQL_PORT"),
		//User:     os.Getenv("MYSQL_USER"),
		//Password: os.Getenv("MYSQL_PASSWORD"),
		//DBName:   os.Getenv("MYSQL_DBNAME"),

		Host:     "localhost",
		Port:     "3306",
		User:     "root",
		Password: "root",
		DBName:   "work",
	}

	c.Db, _ = gorm.Open(mysql.Open(IConfig.Mysql.GetDSN()), &gorm.Config{})
}
