// "@emotion/react"には以下が必須
/** @jsxImportSource @emotion/react */
// /test

import React from "react"
import { Link } from "react-router-dom"
import { css } from "@emotion/react"
//react-day-picker v8.0.4
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
///////////////////////////////
import axios from "axios"
import { useState } from "react"
import { Image } from "./Image"
// カスタムHookを取得
import { useImageGet } from "../hook/useImageGet"

export const TopPage = () => {
  const { useImage } = useImageGet()
  console.log(useImage)

  const [image, setImage] = useState([])
  const topStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  `
  // この部分をカスタムHook化
  const frontImage = async () => {
    try {
      // ポケモンAPIからピカチュウの情報をaxiosで取得
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/25")
      // ポケモンAPIのピカチュウの画像(前）をStateで保存
      setImage(response.data.sprites.front_default)
      console.log(response)
    } catch {
      console.log("画像が取得できませんでした")
    }
  }
  frontImage()

  return (
    <div>
      <div css={topStyle}>
        <h1>Todoアプリ</h1>
        <Link to="/todoregister">Todo登録</Link>
        <DayPicker />
        <Image url={image} />
      </div>
    </div>
  )
}
