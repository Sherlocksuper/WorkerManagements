package modal

import "gorm.io/gorm"

type Depart struct {
	//| \|- id         | number | 非必须 | id       |
	//| -------------- | ------ | ------ | -------- |
	//| \|- name       | string | 非必须 | 部门名称 |
	//| \|- createTime | string | 非必须 | 创建时间 |
	//| \|- updateTime | string | 非必须 | 修改时间 |
	gorm.Model
	Name string `json:"name" gorm:"unique"`
}
