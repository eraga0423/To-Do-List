package models

type Task struct {
	TaskName string `json:"task"`
	Status   string `json:"status"`
	Date     string `json:"date"`
}