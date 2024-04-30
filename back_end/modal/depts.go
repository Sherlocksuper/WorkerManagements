package modal

type Depart struct {
	//| \|- id         | number | 非必须 | id       |
	//| -------------- | ------ | ------ | -------- |
	//| \|- name       | string | 非必须 | 部门名称 |
	//| \|- createTime | string | 非必须 | 创建时间 |
	//| \|- updateTime | string | 非必须 | 修改时间 |
	ID       uint   `gorm:"primaryKey"`
	Name     string `json:"name" gorm:"unique"`
	CreateAt string `json:"createAt"`
	UpdateAt string `json:"updateAt"`
}
