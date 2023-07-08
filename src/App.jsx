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

  const [markdown, setMarkdown] = useState(placeHolder)

  useEffect(() => {
    console.log("I run once! Placerholder set.")
    setMarkdown(markdown)
  }, [])

  function updateMarkdown(e) {
    e.preventDefault()

    const textArea = document.getElementById("text-area")
    let newMarkdown = textArea.value

    setMarkdown(newMarkdown)
    setPlaceHolder(newMarkdown)
  }

  const Editor = () => {
    return (
      <div>
        <form onSubmit={updateMarkdown}>
          <textarea placeholder={placeHolder} name="markdown" id="text-area" cols="50" rows="30"></textarea>
          <button className="submit-button" type="submit">
            Convert
          </button>
        </form>
      </div>
    )
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
        <Editor />
        <ReactMarkdown className="preview" children={markdown} />
      </div>
      <footer className="footer">
        <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
      </footer>
    </>
  )
}

export default App
