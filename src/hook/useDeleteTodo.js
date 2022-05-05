//グローバルStateを使う為のuseContextを読み込み
//TodoListContextを読み込み
import { useContext } from "react"
import { TodoListContext } from "../component/providers/TodoListProvider"
import { useCallback } from "react"

export const useDeleteTodo = () => {
  // グローバルStateの変数を引き出す
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoListContext)

  //Todoを削除する処理：関数deleteTodo
  const deleteTodo = useCallback(
    (index) => {
      const deleteTodos = [...incompleteTodos] // 削除する対象のデータ配列を関数deleteTodoに格納
      deleteTodos.splice(index, 1) // index番号から１番目の要素を削除
      setIncompleteTodos(deleteTodos) // グローバルStateにdeleteTodosを格納）
    },
    [incompleteTodos] // 第二引数にグローバルStateにdeleteTodosを格納
  )

  // 必要な処理、関数を返す
  return { deleteTodo }
}
