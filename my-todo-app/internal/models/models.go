package models

type Task struct {
	Id       int    `json:"id"`
	TaskName string `json:"task"`
	Status   string `json:"status"`
	Date     string `json:"date"`
	Priority string `json:"priority"`
}

type Response struct {
	Status  int    `json:"status"`
	Message string `json:"message,omitempty"`
	Error   string `json:"error,omitempty"`
}
