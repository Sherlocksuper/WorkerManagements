package service

import (
	"back_end/config"
	"back_end/modal"
	"errors"
)

type IListParams interface {
}

func DeleteEmp(ids []int) error {
	for i := range ids {
		err := config.IConfig.Db.Delete(&modal.Emps{}, ids[i])
		if err != nil {
			return err.Error
		}
	}

	return nil
}

func AddEmp(emp *modal.Emps) error {
	err := config.IConfig.Db.Create(emp)
	if err != nil {
		return err.Error
	}
	return nil
}

func FindEmpById(id string) (modal.Emps, error) {
	if id <= "0" || id == "" {
		return modal.Emps{}, errors.New("id格式错误")
	}
	var emp modal.Emps
	err := config.IConfig.Db.Find(&emp, id)
	if err != nil {
		return emp, err.Error
	}
	return emp, nil
}

func UpdateEmp(emp modal.Emps) error {
	err := config.IConfig.Db.Save(&emp)
	if err != nil {
		return errors.New("更新失败")
	}
	return nil
}
