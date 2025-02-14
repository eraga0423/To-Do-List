package main

import (
	"context"
	"fmt"
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

// Greet returns a greeting for the given name
func (a *App) AddTask(taskTime string, task string) string {
	return fmt.Sprintf("Задача %s, до %s добавлена.  ", task, taskTime)
}

// Greet returns a greeting for the given name
func (a *App) GetTasks() []Tasks {
	// var oneTask Tasks
	oneTask := Tasks{
		Task:   "bla",
		Status: "ne vip",
		Date:   "2025",
	}
	tasks := []Tasks{}
	tasks = append(tasks, oneTask)
	return tasks
}

type Tasks struct {
	Task   string `json:"task"`
	Status string `json:"status"`
	Date   string `json:"date"`
}
