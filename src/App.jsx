import { React, useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"

const App = () => {
  const currentYear = new Date().getFullYear()
  const [placeHolder, setPlaceHolder] = useState(`# Made With these Technologies
  
  - Markdown
  
  - React
  
  - react-markdown
  
  *hope you enjoy the app!*
  `)

  const [markdown, setMarkdown] = useState("")

  // Set the placeholder on load
  useEffect(() => {
    setPlaceHolder(placeHolder)
  }, [])

  // Convert in real time
  function handleChange(e) {
    setMarkdown(e.target.value)
  }

  return (
    <>
      <header>
        <h1>Markdown Notes</h1>
        <h2>
          Simple React App with <em>Sanitized</em> HTML
        </h2>
      </header>
      <div className="container">
        <textarea placeholder={placeHolder} value={markdown} onChange={handleChange} cols="50" rows="30" />
        <ReactMarkdown className="preview" children={markdown} />
      </div>
      <footer className="footer">
        <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
      </footer>
    </>
  )
}

export default App
