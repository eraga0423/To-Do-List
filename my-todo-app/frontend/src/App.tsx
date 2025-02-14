import { useState, useEffect } from "react";
import "./App.css";
import { AddTask, GetTasks } from "../wailsjs/go/main/App";

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
    AddTask(task, taskTime)
      .then(() => {
        setTask("");
        setTaskTime("");
        updateResultText("Задача добавлена!");
        loadTasks(); // Обновляем список
      })
      .catch((err) => console.error("Ошибка добавления задачи:", err));
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
        <button className="btn" onClick={loadTasks}>Обновить список</button>
      </div>
      <div>
        <h1>Список задач</h1>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <strong>Задача:</strong> {item.task} <br />
              <strong>Статус:</strong> {item.status} <br />
              <strong>Дата:</strong> {item.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
