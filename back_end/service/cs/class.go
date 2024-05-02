package service

import (
	"back_end/config"
	modal "back_end/modal/cs"
)

type IClass interface {
	UpdateClass(class *modal.Class) error
	RemoveClass(id string) error
	FindClassById(id string, class *modal.Class) error
	FindAllClass(class *[]modal.Class) error
}

func NewClassService() IClass {
	return &ClassService{}
}

type ClassService struct{}

func (c ClassService) UpdateClass(class *modal.Class) error {
	config.IConfig.Db.Save(&class)
	return nil
}

func (c ClassService) RemoveClass(id string) error {
	config.IConfig.Db.Delete(&modal.Class{}, id)
	return nil
}

func (c ClassService) FindClassById(id string, class *modal.Class) error {
	config.IConfig.Db.First(&class, id)
	return nil
}

func (c ClassService) FindAllClass(classes *[]modal.Class) error {
	config.IConfig.Db.Find(&classes)
	return nil
}
