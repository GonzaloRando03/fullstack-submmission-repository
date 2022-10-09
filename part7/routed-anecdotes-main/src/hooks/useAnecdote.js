import { useState } from "react"

const useAnecdote = () => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
  
    const useContent = (cont) => {
      setContent(cont)
    }
  
    const useAuthor = (auth) => {
      setAuthor(auth)
    }
  
    const useInfo = (inf) => {
      setInfo(inf)
    }
  
    return {
      useContent,
      useAuthor,
      useInfo,
      content,
      author,
      info
    }
}

export default useAnecdote