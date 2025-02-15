package repository

import (
	"database/sql"
	database "my-todo-app/internal/db"
	"my-todo-app/internal/models"
)

type Repository interface {
	GetTasksNotComplRepo() ([]models.Task, error)
	DeleteTaskRepo(id int) error
	UpdateTaskRepo(id int) error
	AddTaskRepo(taskTime string, task string, priority string) error
	GetTasksComplRepo() ([]models.Task, error)
}

type repository struct {
	NewDataBase *sql.DB
}

func NewRepo() Repository {
	NewDB := database.NewInitDB()
	return &repository{
		NewDataBase: NewDB,
	}
}
