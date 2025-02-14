package front

type Front interface {
	GetTasks()
	DeleteTask(nameTask string)
	UpdateTask(nameTask string)
	AddTask(taskTime string, task string)
}
