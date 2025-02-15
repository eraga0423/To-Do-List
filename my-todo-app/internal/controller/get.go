package controller

import (
	"log/slog"
	"my-todo-app/internal/models"
	"net/http"
)

func (c *controller) GetTasksNotComplController() ([]models.Task, models.Response) {
	res, err := c.repo.GetTasksNotComplRepo()
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return nil, models.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		}
	}
	return res, models.Response{
		Status:  http.StatusOK,
		Message: "",
	}

}

func (c *controller) GetTasksComplController() ([]models.Task, models.Response) {
	res, err := c.repo.GetTasksComplRepo()
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return nil, models.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		}
	}
	return res, models.Response{
		Status:  http.StatusOK,
		Message: "",
	}

}
