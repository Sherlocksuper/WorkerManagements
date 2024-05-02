package service

import (
	"back_end/config"
	modal "back_end/modal/de"
)

type IDepart interface {
	UpdateDepart(depart *modal.Depart) error
	RemoveDepart(name string) error
	FindDepartById(id string, depart *modal.Depart) error
	FindAllDepart(depart *[]modal.Depart) error
}

func NewDepartService() IDepart {
	return &DepartService{}
}

type DepartService struct{}

// UpdateDepart 增删
func (d DepartService) UpdateDepart(depart *modal.Depart) error {
	config.IConfig.Db.Save(&depart)
	return nil
}

// RemoveDepart 查
func (d DepartService) RemoveDepart(id string) error {
	config.IConfig.Db.Delete(&modal.Depart{}, id)
	return nil
}

// FindDepartById 查
func (d DepartService) FindDepartById(id string, depart *modal.Depart) error {
	config.IConfig.Db.First(&depart, id)
	return nil
}

func (d DepartService) FindAllDepart(depart *[]modal.Depart) error {
	config.IConfig.Db.Find(&depart)
	return nil
}
