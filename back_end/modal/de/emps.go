package modal

import "gorm.io/gorm"

type EmpsSearch struct {
	Name   string `json:"name"`
	Gender Gender `json:"gender"`
}

type Emps struct {
	gorm.Model
	Username  string `json:"username"`
	Name      string `json:"name"`
	Password  string `json:"password"`
	Entrydate string `json:"entryDate"` //入职日期
	Gender    Gender `json:"gender"`    //性别
	Image     string `json:"image"`
	Job       Job    `json:"job"`
	DepartID  uint   `json:"deptId"`
	Depart    Depart `json:"dept" gorm:"foreignKey:DepartID"`
}

// Gender Gender枚举值
type Gender uint

const (
	Male   Gender = 1
	FeMail Gender = 2
)

// Job 工作枚举值
type Job uint

const (
	// HeadTeacher 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
	HeadTeacher Job = 1
	Lecturer    Job = 2
	Dean        Job = 3
	Research    Job = 4
	Counselor   Job = 5
)
