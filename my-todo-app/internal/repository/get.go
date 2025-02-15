package repository

import (
	"my-todo-app/internal/models"
)

func (r *repository) GetTasksNotComplRepo() ([]models.Task, error) {
	var tasks []models.Task
	query := `
	SELECT id, task, status, date, priority
	FROM tasks
	WHERE status = 'not completed'
	`
	rows, err := r.NewDataBase.Query(query)
	if err != nil {
		return nil, err
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var idTask int
		var task, status, date, priority string
		err := rows.Scan(
			&idTask,
			&task,
			&status,
			&date,
			&priority,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, models.Task{
			Id:       idTask,
			TaskName: task,
			Status:   status,
			Date:     date,
			Priority: priority,
		})
	}
	return tasks, nil
}

func (r *repository) GetTasksComplRepo() ([]models.Task, error) {
	var tasks []models.Task
	query := `
	SELECT id, task, status, date, priority
	FROM tasks
	WHERE status = 'completed'
	`
	rows, err := r.NewDataBase.Query(query)
	if err != nil {
		return nil, err
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var idTask int
		var task, status, date, priority string
		err := rows.Scan(
			&idTask,
			&task,
			&status,
			&date,
			&priority,
		)
		if err != nil {
			return nil, err
		}
		tasks = append(tasks, models.Task{
			Id:       idTask,
			TaskName: task,
			Status:   status,
			Date:     date,
			Priority: priority,
		})
	}
	return tasks, nil
}
