package config

type MySQL struct {
	//| \|- host     | string | 必须 | 数据库地址 |
	//| ------------ | ------ | ---- | ---------- |
	//| \|- port     | number | 必须 | 数据库端口 |
	//| \|- user     | string | 必须 | 数据库用户 |
	//| \|- password | string | 必须 | 数据库密码 |
	//| \|- dbname   | string | 必须 | 数据库名称 |
	Host     string `json:"host"`
	Port     string `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	DBName   string `json:"dbname"`
}

func (mysql *MySQL) GetDSN() string {
	return mysql.User + ":" + mysql.Password + "@tcp(" + mysql.Host + ":" + mysql.Port + ")/" + mysql.DBName + "?charset=utf8mb4&parseTime=True&loc=Local"
}
