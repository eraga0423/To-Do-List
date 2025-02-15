package repository

import "errors"

func (r *repository) DeleteTaskRepo(id int) error {
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
DELETE FROM tasks WHERE id = $1;
	`
	res, err := tx.Exec(query, id)
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
