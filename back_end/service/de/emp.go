package service

import (
	"back_end/config"
	modal "back_end/modal/de"
	"fmt"
	"gorm.io/gorm"
)

type IEmpType interface {
	UpdateEmp(emp *modal.Emps) error
	RemoveEmp(id string) error
	FindEmpById(id string, emp *modal.Emps) error
	FindAllEmp(emp *[]modal.Emps, search *modal.EmpsSearch) error
}

func NewEmpService() IEmpType {
	return &EmpService{}
}

type EmpService struct{}

func (e EmpService) UpdateEmp(emp *modal.Emps) error {
	config.IConfig.Db.Save(&emp)
	return nil
}

func (e EmpService) RemoveEmp(id string) error {
	config.IConfig.Db.Delete(&modal.Emps{}, id)

	return nil
}

func (e EmpService) FindEmpById(id string, emp *modal.Emps) error {
	config.IConfig.Db.Preload("Depart").First(&emp, id)
	return nil
}

func (e EmpService) FindAllEmp(emp *[]modal.Emps, search *modal.EmpsSearch) error {

	query := config.IConfig.Db.Session(&gorm.Session{})

	fmt.Println(search.Gender)
	fmt.Println(search.Name)

	if search.Name != "" {
		query = query.Where("name LIKE ?", "%"+search.Name+"%")
	}

	if search.Gender != 0 {
		query = query.Where("gender = ?", search.Gender)
	}

	err := query.Preload("Depart").Find(&emp)
	if err != nil {
		return err.Error
	}
	return nil
}
