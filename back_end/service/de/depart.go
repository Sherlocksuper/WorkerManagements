package service

import modal "back_end/modal/de"

type IDepart interface {
	UpdateDepart(depart *modal.Depart) error
	RemoveDepart(name string) error
}

func NewChatService() IDepart {
	return &DepartService{}
}

type DepartService struct{}

func (d DepartService) UpdateDepart(depart *modal.Depart) error {
	return nil
}

func (d DepartService) RemoveDepart(name string) error {
	return nil
}
