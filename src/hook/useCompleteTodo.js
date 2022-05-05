//グローバルStateを使う為のuseContextを読み込み
//TodoListContextを読み込み
import { useContext } from "react"
import { TodoListContext } from "../component/providers/TodoListProvider"
import { useCallback } from "react"

export const useCompleteTodo = () => {
  // グローバルStateの変数を引き出す
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoListContext)

  //Todoを削除する処理：関数deleteTodo
  const completeTodo = useCallback(
    (index) => {
      const CompleteTodos = [...incompleteTodos] // グローバルStateを関数CompTodosTodoに格納
      CompleteTodos[index].completeFlag = true //対象のデータ配列のCompleteFlagをTrueにする
      setIncompleteTodos(CompleteTodos) // グローバルStateにCompleteTodosを格納
    },
    [incompleteTodos] // 第二引数にグローバルStateにdeleteTodosを格納
  )

  // 必要な処理、関数を返す
  return { completeTodo }
}
