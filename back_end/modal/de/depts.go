package modal

import "gorm.io/gorm"

type Depart struct {
	gorm.Model
	Name string `json:"name" gorm:"unique"`
	Emps []Emps `json:"emps"`
}
