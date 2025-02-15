package controller

import (
	"my-todo-app/internal/models"
	"my-todo-app/internal/repository"
)

type Controller interface {
	GetTasksNotComplController() ([]models.Task, models.Response)
	DeleteTaskContrller(id int) models.Response
	UpdateTaskController(id int) models.Response
	AddTaskController(taskTime string, task string, priority string) models.Response
	GetTasksComplController() ([]models.Task, models.Response)
}

type controller struct {
	repo repository.Repository
}

func NewController(newRepo repository.Repository) Controller {
	return &controller{repo: newRepo}
}
