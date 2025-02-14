package validation

type Validation interface {
	GetTasksValid()
	DeleteTaskValid(nameTask string)
	UpdateTaskValid(nameTask string)
	AddTaskVali(taskTime string, task string)
}
