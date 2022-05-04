//グローバルStateを使う為のuseContextを読み込み
//TodoListContextを読み込み
import { useContext } from "react"
import { TodoListContext } from "../component/providers/TodoListProvider"

//を読み込み
import toast from "react-hot-toast"

export const useAddTodo = () => {
  // グローバルStateの変数を引き出す
  const {
    newTodo,
    setNewTodo,
    incompleteTodos,
    setIncompleteTodos,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useContext(TodoListContext)

  //Todoを追加する処理：関数todoFetch
  const todoFetch = () => {
    if (newTodo === "") return
    const newTodos = [
      ...incompleteTodos,
      {
        id: incompleteTodos.length,
        todo: newTodo,
        completeFlag: false,
        from: startDate,
        end: endDate,
      },
    ]
    setIncompleteTodos(newTodos) // setIncompleteTodosにnewTodosの状態を登録
    setNewTodo("") // setNewTodoに空の状態を登録
    toast.success("Todoを登録しました.")
    setStartDate(undefined) // 開始日をリセット
    setEndDate(undefined) // 終了日をリセット
  }

  //todoタスクのテキストボックスで入力した値を保存する
  const valueFetch = (e) => setNewTodo(e.target.value)

  // 開始日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をstartDateの状態を保管
  const startDayFetch = (day) => {
    setStartDate(day.toLocaleDateString())
  }
  // 終了日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をendDateの状態を保管
  const endDayFetch = (day) => {
    setEndDate(day.toLocaleDateString())
  }

  return { todoFetch, valueFetch, startDayFetch, endDayFetch }
}
