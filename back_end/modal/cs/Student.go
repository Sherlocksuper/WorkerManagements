package modal

import (
	"gorm.io/gorm"
)

type StudentSearch struct {
	Name  string
	Phone string
}

type Student struct {
	gorm.Model
	Name        string `json:"name"`
	ClassID     uint   `json:"classId"`
	Class       Class  `json:"class" gorm:"foreignKey:ClassID"`
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
