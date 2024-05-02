package service

import (
	"back_end/config"
	modal "back_end/modal/cs"
)

type IStudent interface {
	UpdateStudent(stu *modal.Student) error
	RemoveStudent(id string) error
	FindStudentById(id string, stu *modal.Student) error
	FindAllStudent(stu *[]modal.Student) error
}

func NewStudentService() IStudent {
	return &StudentService{}
}

type StudentService struct{}

func (s StudentService) UpdateStudent(stu *modal.Student) error {
	config.IConfig.Db.Save(&stu)
	return nil
}

func (s StudentService) RemoveStudent(id string) error {
	config.IConfig.Db.Delete(&modal.Student{}, id)
	return nil
}

func (s StudentService) FindStudentById(id string, stu *modal.Student) error {
	config.IConfig.Db.Preload("Class").First(&stu, id)
	return nil
}

func (s StudentService) FindAllStudent(stu *[]modal.Student) error {
	config.IConfig.Db.Preload("Class").Find(&stu)
	return nil
}
