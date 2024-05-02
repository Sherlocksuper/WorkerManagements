package service

import (
	"back_end/config"
	modal "back_end/modal/de"
)

type IEmpType interface {
	UpdateEmp(emp *modal.Emps) error
	RemoveEmp(id string) error
	FindEmpById(id string, emp *modal.Emps) error
	FindAllEmp(emp *[]modal.Emps) error
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
	config.IConfig.Db.First(&emp, id)
	return nil
}

func (e EmpService) FindAllEmp(emp *[]modal.Emps) error {
	config.IConfig.Db.Find(&emp)
	return nil
}
