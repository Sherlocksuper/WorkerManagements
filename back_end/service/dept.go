package service

import (
	"back_end/config"
	"back_end/modal"
	"errors"
)

//> 请求路径：/depts
//> 请求方式：GET
//> 接口描述：该接口用于部门列表数据查询

func GetDeparts() ([]modal.Depart, error) {
	var departs []modal.Depart

	err := config.IConfig.Db.Find(&departs)

	if err != nil {
		return nil, err.Error
	}
	return departs, nil
}

func DeleteDepart(id int) error {
	err := config.IConfig.Db.Delete(&modal.Depart{}, id)
	if err != nil {
		return err.Error
	}
	return nil
}

func CreateDepart(name string) error {
	if name == "" {
		return errors.New("部门名称不能为空")
	}

	var depart modal.Depart
	depart.Name = name

	err := config.IConfig.Db.Create(depart)
	if err != nil {
		return err.Error
	}
	return nil
}

func FindById(id int) (modal.Depart, error) {
	var depart modal.Depart
	err := config.IConfig.Db.Find(&depart, id)
	if err != nil {
		return depart, err.Error
	}
	return depart, nil
}

func UpdateDepart(depart modal.Depart) error {
	err := config.IConfig.Db.Save(&depart)
	if err != nil {
		return errors.New("更新失败")
	}
	return nil
}
