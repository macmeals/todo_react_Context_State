// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { LinkText } from "../LinkText"
import { Button } from "../Button"
import { useCallback } from "react"
import { useEffect } from "react"

// カスタムHook（JSONPlaceHolder用の）
import { useTextGet } from "../../hook/useTextGet"

// グローバルStateを取得
import { useContext } from "react"
import { TodoListContext } from "../providers/TodoListProvider"

export const TodoList = () => {
  const todoStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `

  const todoTitleStyle = css`
    width: 80vw;
    background-color: #eee6e6;
  `
  const todoListStyle = css`
    width: 80vw;
    padding-inline-start: 0;
  `

  // StyledListからpropsを受け取り、todoFlagがtrueの場合、text-decoration:line-throughとなる
  const StyledList = styled.li`
    display: flex;
    padding-left: 20px;
    align-items: center;
    > p {
      width: 20vw;
      text-decoration: ${(props) => (props.todoflag ? "line-through" : "")};
      margin-block-start: 0;
      margin-block-end: 0;
    }
    &:nth-of-type(2n) {
      background-color: #ffeded;
    }
  `

  const TodoTitles = styled.div`
    display: flex;
    margin-left: 20px;
    > p {
      width: 20vw;
    }
  `

  // グローバルStateの変数 incompleteTodos、setIncompleteTodosをuseContext利用で取り出す。
  const { incompleteTodos, setIncompleteTodos } = useContext(TodoListContext)

  // todoリストを削除する関数onDeleteTodoを定義
  const onDeleteTodo = useCallback(
    (index) => {
      const deleteTodos = [...incompleteTodos] // 削除する対象のデータ配列を関数deleteTodoに格納
      deleteTodos.splice(index, 1) // index番号から１番目の要素を削除
      setIncompleteTodos(deleteTodos) // グローバルStateにdeleteTodosを格納
    },
    [incompleteTodos] // 第二引数にグローバルStateにdeleteTodosを格納
  )

  // todoリストを完了（completeFlagをTrueにする）関数onCompleteTodoを定義
  const onCompleteTodo = useCallback(
    (index) => {
      const CompleteTodos = [...incompleteTodos] // グローバルStateを関数CompTodosTodoに格納
      CompleteTodos[index].completeFlag = true //対象のデータ配列のCompleteFlagをTrueにする
      setIncompleteTodos(CompleteTodos) // グローバルStateにCompleteTodosを格納
    },
    [incompleteTodos] // 第二引数にグローバルStateにdeleteTodosを格納
  )

  // カスタムHookから変数useImage,関数imageFetchを取得
  const { apiJson, jsonFetch } = useTextGet()

  // TodoList.jsx時のみ関数jsonFetch()を実施
  useEffect(() => {
    jsonFetch()
  }, [])

  return (
    <div css={todoStyle}>
      <h2>Todo一覧</h2>
      {/* useJsonがNullの時、ブランクを返し、値が入ればuseJson.data[1].titleを返す */}
      {/* <p>{useJson?.data[1].title ?? ""}</p> */}
      <p>{apiJson}</p>
      <div css={todoTitleStyle}>
        <TodoTitles>
          <p>Todo開始日</p>
          <p>Todo終了日</p>
          <p>Todoタスク</p>
        </TodoTitles>
      </div>
      <ul css={todoListStyle}>
        {incompleteTodos.map((todos, index) => {
          return (
            <StyledList key={todos.id} todoflag={todos.completeFlag}>
              <p>{todos.from}</p>
              <p>{todos.end}</p>
              <p>{todos.todo}</p>
              {/* Buttonコンポーネントにアロー関数で関数onDeleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onDeleteTodo(index)}>削除</Button>
              {/* Buttonコンポーネントにアロー関数で関数onCompleteTodo(index)をPropsで渡す。indexは引数 */}
              <Button onClickEvent={() => onCompleteTodo(index)}>完了</Button>
            </StyledList>
          )
        })}
      </ul>
      <LinkText destination={"/todoregister"}>Todo登録</LinkText>
    </div>
  )
}
