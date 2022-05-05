// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { useEffect } from "react"
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

  // グローバルStateの変数群を取り出す。
  const { newTodo, startDate, endDate } = useContext(TodoListContext)

  // カスタムHookから変数apiPokemonBack,,関数imageFetchを取得
  const { apiPokemonBack, imageFetch } = useImageGet()
  // カスタムHookから関数todoFetch, valueFetch, startDayFetch, endDayFetchを取得
  const { todoFetch, valueFetch, startDayFetch, endDayFetch } = useAddTodo()

  // Todoページマウント時のみ関数imageFetch()を実施
  useEffect(() => {
    imageFetch()
  }, [])

  return (
    <div css={registerStyle}>
      <h2>Todo登録</h2>
      {/* ピカチュウの画像をImageコンポーネントで呼び出す */}
      <Image url={apiPokemonBack} />
      <div css={matrixStyle}>
        <div css={registerStyle}>
          <p>１．Todo開始日</p>
          {/* カスタムHookから取得した関数startDayFetchを利用 */}
          <DayPicker onDayClick={startDayFetch} />
          {startDate ? (
            <p> 【Todo開始日】{startDate}</p>
          ) : (
            <p>開始日を選択して下さい</p>
          )}
        </div>
        <div css={registerStyle}>
          <p>２．Todo完了日</p>
          {/* カスタムHookから取得した関数endDayFetchを利用 */}
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
        // カスタムHookから取得した関数valueFetchを利用
        onChange={valueFetch}
      />
      {/* Buttonコンポーネントにアロー関数でカスタムHookから取得した関数todoFetchを渡す。 */}
      <Button onClickEvent={() => todoFetch()}>登録</Button>
      <Toaster />
      <LinkText destination={"/todolist"}>Todo一覧へ</LinkText>
    </div>
  )
}
