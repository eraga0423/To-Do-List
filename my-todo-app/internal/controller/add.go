package controller

import (
	"errors"
	"log/slog"
	"my-todo-app/internal/models"
	"net/http"
	"regexp"
	"strings"
	"time"
)

func (c *controller) AddTaskController(taskTime string, task string, priority string) models.Response {

	err := validTaskTime(taskTime)
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return models.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		}

	}

	validTask, err := validateTask(task)
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return models.Response{
			Status: http.StatusBadRequest,
			Error:  err.Error(),
		}
	}
	err = c.repo.AddTaskRepo(taskTime, validTask, priority)
	if err != nil {
		slog.Error(err.Error(), "in", "controller")
		return models.Response{
			Status: http.StatusInternalServerError,
			Error:  err.Error(),
		}
	}
	return models.Response{
		Status:  http.StatusCreated,
		Message: "Задача добавлена",
	}
}

func validateTask(task string) (string, error) {
	task = strings.TrimSpace(task)
	maxTalkLenth := 255
	if task == "" {
		return "", errors.New("task cannot be empty")
	}
	if len(task) > maxTalkLenth {
		return "", errors.New("too big text")
	}
	re := regexp.MustCompile(`^[a-zA-Z0-9а-яА-ЯёЁ,.!?:;()\- ]+$`)
	if !re.MatchString(task) {
		return "", errors.New("invalid characters")
	}
	return task, nil
}

func validTaskTime(taskTime string) error {
	layout := "2006-01-02T15:04"

	taskTimeFormat, err := time.Parse(layout, taskTime)
	if err != nil {
		return err
	}
	now := time.Now()

	if taskTimeFormat.Equal(now) || now.After(taskTimeFormat) {
		return errors.New("the time does not match")
	}
	return nil
}
