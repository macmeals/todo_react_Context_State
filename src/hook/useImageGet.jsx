// ポケモンAPIから画像情報を取得する部分をカスタムHook化
import axios from "axios"

// 無駄なレンダリングを防ぎ、State状態を管理する。
import { useState } from "react"
import { useCallback } from "react"

export const useImageGet = () => {
  const [useImage, setUserImage] = useState([])

  const imageFetch = useCallback(async () => {
    try {
      // ポケモンAPIからピカチュウの情報をaxiosで取得
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/25")
      // ポケモンAPIのピカチュウ情報を格納
      setUserImage(response)
    } catch {
      console.log("画像が取得できませんでした")
    }
    imageFetch()
  }, [])

  return { useImage } // ポケモンAPIの情報を返す
}
