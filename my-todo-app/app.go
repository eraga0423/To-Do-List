package main

import (
	"context"
	"fmt"
	"my-todo-app/internal/validation"
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
	validation.AddTaskValid(task, taskTime)

	return fmt.Sprintf("Задача %s, до %s добавлена.  ", task, taskTime)
}

// Greet returns a greeting for the given name
// func (a *App) GetTasks() []Task {
// 	// var oneTask Tasks
// 	oneTask := Task{
// 		TaskName: "bla",
// 		Status:   "ne vip",
// 		Date:     "2025",
// 	}
// 	tasks := []Task{}
// 	for i := 0; i < 10; i++ {
// 		oneTask.TaskName = fmt.Sprintf("%dфффффффффффффффффффффффффффф", i)
// 		tasks = append(tasks, oneTask)
// 	}

// 	return tasks
// }

// func (a App) DeleteTask(nameTask string) string {
// 	return "udaleno"
// }

// func (a App) UpdateTask(nameTask string) Task {
// 	Updating := models.Task{
// 		TaskName: "ubrat u pesni",
// 		Status:   "vypolnen",
// 		Date:     "20225",
// 	}
// 	return Updating
// }
