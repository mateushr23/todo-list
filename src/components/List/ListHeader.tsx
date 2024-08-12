import styles from "./ListHeader.module.css"

interface Props {
  tasksCounter: number
  checkedTasksCounter: number

}

export function ListHeader({ tasksCounter, checkedTasksCounter }: Props) {
  return (
    <header className={styles.header}>
      <p>
        Tarefas criadas <span>{tasksCounter}</span>
      </p>
      <p>
        Concluídas{" "}
        <span>
          {tasksCounter === 0
            ? tasksCounter
            : `${checkedTasksCounter} de ${tasksCounter}`}
        </span>
      </p>
    </header>
  )
}
