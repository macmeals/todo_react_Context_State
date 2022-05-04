// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

// import { useState } from "react"
import { useEffect } from "react"
// import toast, { Toaster } from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import { css } from "@emotion/react"
import { DayPicker } from "react-day-picker" // react-day-picker：v8.0.１
import "react-day-picker/dist/style.css" // react-day-picker：v8.0.１
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { Image } from "../Image"

//カスタムHookを読み込み
import { useImageGet } from "../../hook/useImageGet" //画像取得
import { useAddTodo } from "../../hook/useAddTodo" //Todo関連の処理

//グローバルStateを使う為のuseContextを読み込み
//TodoListContextを読み込み
import { useContext } from "react"
import { TodoListContext } from "../providers/TodoListProvider"

export const TodoRegister = () => {
  const registerStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
  const matrixStyle = css`
    display: flex;
    width: 50vw;
    justify-content: space-between;
  `
  const inputStyle = css`
    width: 600px;
  `
  // →→→ ローカルStateは一旦コメントアウト
  //  初期値Todoタスクのvalueを空にセット、状態を格納する変数setNewTodoをセット
  // const [newTodo, setNewTodo] = useState("")

  //  初期値Todoの開始日のvalueを空にセット、状態を格納する変数setStartDateをセット
  // const [startDate, setStartDate] = useState(undefined)

  //  初期値Todoの終了日のvalueを空にセット、状態を格納する変数setEndDateをセット
  // const [endDate, setEndDate] = useState(undefined)

  // グローバルStateの変数群を取り出す。
  const {
    newTodo,
    // setNewTodo,
    // incompleteTodos,
    // setIncompleteTodos,
    startDate,
    // setStartDate,
    endDate,
    // setEndDate,
  } = useContext(TodoListContext)

  // カスタムHookから変数apiPokemonBack,,関数imageFetchを取得
  const { apiPokemonBack, imageFetch } = useImageGet()
  // カスタムHookから関数todoFetch, valueFetch, startDayFetch, endDayFetchを取得
  const { todoFetch, valueFetch, startDayFetch, endDayFetch } = useAddTodo()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  // todoタスクのテキストボックスで入力した値を保存する
  // const changeValue = (e) => setNewTodo(e.target.value)

  // 開始日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をstartDateの状態を保管
  // const handleStartDay = (day) => {
  //   setStartDate(day.toLocaleDateString())
  // }
  // 終了日の状態を保存
  // onDayClickのイベントハンドラーはdayという引数で日程を取得可能
  // 取得した日程をendDateの状態を保管
  // const handleEndDay = (day) => {
  //   setEndDate(day.toLocaleDateString())
  // }

  // onAddTodoを実施して、incompleteTodosでtodoリスト、完了フラグ、開始日、終了日を格納
  // const onAddTodo = () => {
  //   if (newTodo === "") return
  //   const newTodos = [
  //     ...incompleteTodos,
  //     {
  //       id: incompleteTodos.length,
  //       todo: newTodo,
  //       completeFlag: false,
  //       from: startDate,
  //       end: endDate,
  //     },
  //   ]
  //   setIncompleteTodos(newTodos) // setIncompleteTodosにnewTodosの状態を登録
  //   setNewTodo("") // setNewTodoに空の状態を登録
  //   toast.success("Todoを登録しました.")
  //   setStartDate(undefined) // 開始日をリセット
  //   setEndDate(undefined) // 終了日をリセット
  // }

  return (
    <div css={registerStyle}>
      <h2>Todo登録</h2>
      {/* ピカチュウの画像をImageコンポーネントで呼び出す */}
      <Image url={apiPokemonBack} />
      <div css={matrixStyle}>
        <div css={registerStyle}>
          <p>１．Todo開始日</p>
          {/* <DayPicker onDayClick={handleStartDay} /> */}
          <DayPicker onDayClick={startDayFetch} />
          {startDate ? (
            <p> 【Todo開始日】{startDate}</p>
          ) : (
            <p>開始日を選択して下さい</p>
          )}
        </div>
        <div css={registerStyle}>
          <p>２．Todo完了日</p>
          {/* <DayPicker onDayClick={handleEndDay} /> */}
          <DayPicker onDayClick={endDayFetch} />
          {endDate ? (
            <p>【Todo終了日】{endDate}</p>
          ) : (
            <p>終了日を選択して下さい</p>
          )}
        </div>
      </div>
      <p>３．Todoタスク</p>
      <input
        css={inputStyle}
        type="text"
        value={newTodo}
        // onChange={changeValue}
        onChange={valueFetch}
      />
      {/* Buttonコンポーネントにアロー関数で関数onAddTodoをPropsで渡す。 */}
      {/* <Button onClickEvent={() => onAddTodo()}>登録</Button> */}
      <Button onClickEvent={() => todoFetch()}>登録</Button>
      <Toaster />
      <LinkText destination={"/todolist"}>Todo一覧へ</LinkText>
    </div>
  )
}
