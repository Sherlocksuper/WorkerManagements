package modal

import "gorm.io/gorm"

//姓名	学号	班级	性别	手机号	最高学历	违纪次数	违纪扣分		操作

type Student struct {
	gorm.Model
	Name        string `json:"name"`
	ClassID     string `json:"class"`
	Gender      Gender `json:"gender"`
	Phone       string `json:"phone"`
	Education   string `json:"education"`
	RecordTimes int    `json:"recordTimes"`
	RecordScore int    `json:"recordScore"`
}

type Gender uint

const (
	Male   Gender = 1
	FeMale Gender = 2
)
