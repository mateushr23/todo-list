import styles from "./EmptyList.module.css"
import task from "../../assets/task.svg"

export function EmptyList() {
  return (
    <div className={styles.tasks}>
      <img src={task} />
      <span>Você ainda não tem tarefas cadastradas</span>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
