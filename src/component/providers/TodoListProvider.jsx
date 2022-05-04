import { createContext } from "react"
import { useState } from "react"

//contextの器を作成
export const TodoListContext = createContext({})

export const TodoListProvider = (props) => {
  //  Todo内容を格納する変数newTodo、状態を格納する変数setNewTodoをセット
  const [newTodo, setNewTodo] = useState("")

  //  開始日時を格納する変数startDate、状態を格納するsetStartDateをセット
  const [startDate, setStartDate] = useState(undefined)

  //  終了日時を格納する変数endDate、状態を格納する変数setEndDateをセット
  const [endDate, setEndDate] = useState(undefined)

  // Todo内容、開始日時、終了日時を格納する変数incompleteTodos、状態を格納する変数setIncompleteTodosをセット
  const [incompleteTodos, setIncompleteTodos] = useState([])

  const { children } = props

  return (
    //valueに渡したい値を渡す。ここでは上記４つのstateを渡す。
    <TodoListContext.Provider
      value={{
        newTodo,
        setNewTodo,
        incompleteTodos,
        setIncompleteTodos,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </TodoListContext.Provider>
  )
}
