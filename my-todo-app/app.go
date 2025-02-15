package main

import (
	"context"
	"my-todo-app/internal/controller"
	"my-todo-app/internal/models"
	"my-todo-app/internal/repository"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func New() controller.Controller {
	repo := repository.NewRepo()
	return controller.NewController(repo)
}

func (a *App) AddTask(taskTime string, task string, priority string) models.Response {
	return New().AddTaskController(taskTime, task, priority)
}

func (a *App) GetTasksNotCompleted() ([]models.Task, models.Response) {
	return New().GetTasksNotComplController()
}

func (a *App) DeleteTask(id int) models.Response {
	return New().DeleteTaskContrller(id)
}

func (a *App) UpdateTask(id int) models.Response {
	return New().UpdateTaskController(id)
}

func (a *App) GetTasksCompleted() ([]models.Task, models.Response) {
	return New().GetTasksComplController()
}
