package controller

import (
	"log/slog"
	"my-todo-app/internal/models"
	"net/http"
)

func (c *controller) DeleteTaskContrller(id int) models.Response {
	if id <= 0 {
		slog.Error("incorrect id", "in", "controller")
		return models.Response{
			Status: http.StatusBadRequest,
			Error:  "incorrect id",
		}
	}
	err := c.repo.DeleteTaskRepo(id)
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return models.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		}
	}
	return models.Response{
		Status: http.StatusNoContent,
	}
}
