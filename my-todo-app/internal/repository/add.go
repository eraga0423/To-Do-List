package repository

import (
	"errors"
)

func (r *repository) AddTaskRepo(taskTime string, task string, priority string) error {
	tx, err := r.NewDataBase.Begin()
	if err != nil {
		return err
	}
	defer func() {
		p := recover()
		if p != nil {
			tx.Rollback()
			panic(p)
		} else if err != nil {
			tx.Rollback()
		} else {
			err = tx.Commit()
		}
	}()
	query := `
	INSERT INTO tasks (task, status, date, priority)
	VALUES ($1, $2, $3, $4);
	`
	res, err := tx.Exec(query, task, "not completed", taskTime, priority)
	if err != nil {
		return err
	}
	rA, err := res.RowsAffected()
	if err != nil {
		return err
	} else if rA == 0 {
		return errors.New("no rows affected")
	}
	return nil
}
