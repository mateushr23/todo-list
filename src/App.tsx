import { Input } from "./components/Input"
import { EmptyList } from "./components/List/EmptyList"
import { Header } from "./components/Header"
import { ListHeader } from "./components/List/ListHeader"
import { Button } from "./components/Button"
import styles from "./App.module.css"
import { Task } from "./components/List/Task"
import { ChangeEvent, useState } from "react"
import { PlusCircle } from "@phosphor-icons/react"

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTaskText, setNewTaskText] = useState("")

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }
    return prevValue
  }, 0)

  function handleAddTask() {
    if (!newTaskText) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: newTaskText,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setNewTaskText("")
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value)
  }

  function deleteTask(id: number) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id
    })
    setTasks(tasksWithoutDeletedOne)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }
  return (
    <main>
      <Header />
      <section className={styles.content}>
        <div className={styles.addTaskContainer}>
          <Input onChange={handleNewTaskChange} value={newTaskText} />
          <Button onClick={handleAddTask}>
            Criar <PlusCircle size={16} weight="bold" color="#f2f2f2" />
          </Button>
        </div>
        <div className={styles.taskList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    data={task}
                    onDeleteTask={deleteTask}
                    toggleTaskStatus={handleToggleTask}
                  />
                )
              })}
            </div>
          ) : (
            <EmptyList />
          )}
        </div>
      </section>
    </main>
  )
}
