import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks, DeleteTask, UpdateTask } from "../wailsjs/go/main/App";

interface Task {
  task: string;
  status: string;
  date: string;
}

function App() {
  const [resultText, setResultText] = useState("Введите задачу");
  const [task, setTask] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Обновление значений инпутов
  const updateTask = (e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value);
  const updateTaskTime = (e: React.ChangeEvent<HTMLInputElement>) => setTaskTime(e.target.value);

  // Обновление состояния после добавления задачи
  const updateResultText = (result: string) => setResultText(result);

  // Функция для загрузки списка задач из Go
  const loadTasks = () => {
    GetTasks()
      .then((data: Task[]) => setTasks(data))
      .catch((err) => console.error("Ошибка загрузки задач:", err));
  };

  // Добавление новой задачи
  function addNewTask() {
    if (!task.trim()) {
      updateResultText("Ошибка: задача не может быть пустой!");
      return;
    }
    AddTask(task, taskTime)
      .then(() => {
        setTask("");
        setTaskTime("");
        updateResultText("Задача добавлена!");
        loadTasks();
      })
      .catch((err) => console.error("Ошибка добавления задачи:", err));
  }

  // Удаление задачи
  function removeTask(taskName: string) {
    DeleteTask(taskName)
      .then(() => {
        updateResultText("Задача удалена!");
        loadTasks();
      })
      .catch((err) => console.error("Ошибка удаления задачи:", err));
  }

  // Отметка задачи как выполненной (можно нажать только 1 раз)
  function markTaskAsDone(taskName: string) {
    UpdateTask(taskName)
      .then(() => {
        updateResultText("Задача выполнена!");
        loadTasks();
      })
      .catch((err) => console.error("Ошибка обновления статуса:", err));
  }

  // Загрузка задач при запуске
  useEffect(() => {
    loadTasks();
  }, []);

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
          onChange={updateTask}
          value={task}
          autoComplete="off"
          type="text"
          placeholder="Введите задачу"
        />
        <button className="btn" onClick={addNewTask}>Добавить задачу</button>
      </div>
      <div>
        <h1>Список задач</h1>
        <table className="task-table">
          <thead>
            <tr>
              <th>Задача</th>
              <th>Дата выполнения</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item, index) => (
              <tr key={index}>
                <td>{item.task}</td>
                <td>{item.date}</td>
                <td>{item.status}</td>
                <td>
                  <button className="btn-delete" onClick={() => removeTask(item.task)}>Удалить</button>
                  <button
                    className="btn-done"
                    onClick={() => markTaskAsDone(item.task)}
                    disabled={item.status === "Done"}
                  >
                    Готово
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
