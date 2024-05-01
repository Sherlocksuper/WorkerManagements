package modal

import "gorm.io/gorm"

type Class struct {
	gorm.Model
	Name        string `json:"name"`
	Room        string `json:"room"`
	StartTime   string `json:"startTime"`
	EndTime     string `json:"endTime"`
	HeadTeacher string `json:"headTeacher"`
}
