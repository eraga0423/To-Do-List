import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { AddTask, GetTasksCompleted, GetTasksNotCompleted, DeleteTask, UpdateTask } from "../wailsjs/go/main/App";

interface Task {
  id: number;
  task: string;
  status: string;
  date: string;
  priority: string; // Добавляем поле для приоритета
}

interface Response {
  status: number;
  message?: string;
  error?: string;
}

function App() {
  const [resultText, setResultText] = useState("Введите задачу");
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [priority, setPriority] = useState("Medium"); // Состояние для приоритета
  const [allTasks, setAllTasks] = useState<Task[]>([]); // Объединяем все задачи

  const updateTaskName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value), []);
  const updateTaskTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTaskTime(e.target.value), []);
  const updatePriority = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setPriority(e.target.value), []);
  const updateResultText = useCallback((message: string) => setResultText(message), []);

  // Функция для сортировки задач по приоритету
  const sortTasksByPriority = (tasks: Task[]) => {
    return tasks.sort((a, b) => {
      const priorities = ["High", "Medium", "Low"];
      return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
    });
  };

  const loadTasks = useCallback(() => {
    Promise.all([GetTasksNotCompleted(), GetTasksCompleted()])
      .then(([notCompletedData, completedData]) => {
        // Проверяем, что данные от API являются массивами задач
        if (Array.isArray(notCompletedData)) {
          const sortedNotCompletedTasks = sortTasksByPriority(notCompletedData);
          setAllTasks(prevTasks => [
            ...sortedNotCompletedTasks.map((task) => ({ ...task, status: "Not Completed" })),
            ...prevTasks.filter(task => task.status !== "Not Completed")
          ]);
        } else {
          updateResultText(notCompletedData.error || "Ошибка загрузки не выполненных задач");
        }
  
        if (Array.isArray(completedData)) {
          const sortedCompletedTasks = sortTasksByPriority(completedData);
          setAllTasks(prevTasks => [
            ...prevTasks.filter(task => task.status !== "Completed"),
            ...sortedCompletedTasks.map((task) => ({ ...task, status: "Completed" }))
          ]);
        } else {
          updateResultText(completedData.error || "Ошибка загрузки выполненных задач");
        }
      })
      .catch((err) => console.error("Ошибка загрузки задач:", err));
  }, [updateResultText, sortTasksByPriority]);
  

  const handleTaskAction = (
    action: (taskId: number) => Promise<Response>,
    taskId: number,
    successMessage: string,
    errorMessage: string
  ) => {
    action(taskId)
      .then((response: Response) => {
        if (response.status === 200 || response.status === 204) {
          updateResultText(successMessage);
          loadTasks();
        } else {
          updateResultText(response.error || errorMessage);
          loadTasks();
        }
      })
      .catch((err) => console.error(errorMessage, err));
  };

  function addNewTask() {
    if (!taskName.trim()) {
      updateResultText("Ошибка: задача не может быть пустой!");
      return;
    }
    AddTask(taskTime, taskName, priority) // Передаем приоритет в функцию добавления задачи
      .then((response: Response) => {
        if (response.status === 201) {
          setTaskName("");
          setTaskTime("");
          setPriority("Medium"); // Сбрасываем приоритет в "Средний" после добавления задачи
          updateResultText("Задача добавлена!");
          loadTasks(); // Загружаем задачи после добавления новой
        } else {
          loadTasks();
          updateResultText(response.error || "Ошибка при добавлении задачи");
        }
      })
      .catch((err) => console.error("Ошибка добавления задачи:", err));
  }

  function removeTask(taskId: number) {
    handleTaskAction(DeleteTask, taskId, "Задача удалена!", "Ошибка при удалении задачи");
  }

  function markTaskAsDone(taskId: number) {
    handleTaskAction(UpdateTask, taskId, "Задача выполнена!", "Ошибка при обновлении задачи");
  }

  function markTaskAsNotDone(taskId: number) {
    handleTaskAction(UpdateTask, taskId, "Задача снова в списке невыполненных!", "Ошибка при обновлении задачи");
  }

  useEffect(() => {
    loadTasks(); // Загружаем задачи при первом рендере

    const interval = setInterval(() => {
      loadTasks(); // Автообновление списка задач каждые 5 секунд
    }, 5000);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [loadTasks]);

  return (
    <div id="App">
      <div id="result" className="result">{resultText}</div>
      <div id="input" className="input-box">
        <input
          id="taskTime"
          type="datetime-local"
          className="input datetime-input"
          onChange={updateTaskTime}
          value={taskTime}
          autoComplete="off"
        />
        <input
          id="task"
          className="input"
          onChange={updateTaskName}
          value={taskName}
          autoComplete="off"
          type="text"
          placeholder="Введите задачу"
        />
        <select
          id="priority"
          className="input"
          value={priority}
          onChange={updatePriority}
        >
          <option value="High">Высокий</option>
          <option value="Medium">Средний</option>
          <option value="Low">Низкий</option>
        </select>
        <button className="btn" onClick={addNewTask}>Добавить задачу</button>
      </div>

      <div className="task-columns">
        <div className="task-column">
          <h1>Не выполненные задачи</h1>
          <table className="task-table">
            <thead>
              <tr>
                <th>Задача</th>
                <th>Дата выполнения</th>
                <th>Статус</th>
                <th>Приоритет</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.filter((task) => task.status === "Not Completed").map((item) => (
                <tr key={item.id}>
                  <td>{item.task}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{item.priority}</td>
                  <td>
                    <button className="btn-delete" onClick={() => removeTask(item.id)}>Удалить</button>
                    <button className="btn-done" onClick={() => markTaskAsDone(item.id)}>Готово</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="task-column">
          <h1>Выполненные задачи</h1>
          <table className="task-table">
            <thead>
              <tr>
                <th>Задача</th>
                <th>Дата выполнения</th>
                <th>Статус</th>
                <th>Приоритет</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.filter((task) => task.status === "Completed").map((item) => (
                <tr key={item.id} className="done-task">
                  <td><s>{item.task}</s></td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{item.priority}</td>
                  <td>
                    <button className="btn-delete" onClick={() => removeTask(item.id)}>Удалить</button>
                    <button className="btn-done" onClick={() => markTaskAsNotDone(item.id)}>Не готово</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
