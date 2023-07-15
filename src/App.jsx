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
  const [title, setTitle] = useState("")
  // Set notes array to local storage on load if it's there or an empty array
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [{ id: Date.now(), title: "Demo Note", content: "demo content" }])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]

  // Set the placeholder on load
  useEffect(() => {
    setPlaceHolder(placeHolder)
  }, [])

  // When notes array is updated - set local storage to notes array
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // Convert markdown to html in real time
  function handleChange(e) {
    setMarkdown(e.target.value)
  }

  // Update notes array with new note
  function saveNote(e) {
    e.preventDefault()
    let newNote = { id: Date.now(), title: title, content: markdown }
    setNotes(oldNotes => [newNote, ...oldNotes])
    console.log("note saved")
  }

  function updateNote(currentNoteId) {
    setNotes(function (notes) {
      const newlyArrangedNotes = []

      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === currentNoteId) {
          newlyArrangedNotes.unshift({ ...notes[i], body: markdown })
          setTitle(newlyArrangedNotes[0].title)
          setMarkdown(newlyArrangedNotes[0].content)
        } else {
          newlyArrangedNotes.push(notes[i])
        }
      }
      return newlyArrangedNotes
    })
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
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Notes:</h3>
          <ul>
            {notes.map(note => {
              return (
                <li key={note.id} id={note.id} onClick={() => updateNote(note.id)} className="sidebar__li">
                  <p>{note.title}</p>
                  {/* <button onClick={updateNote}>Edit</button> */}
                  <button
                    onClick={() => {
                      setNotes(notes.filter(n => n.id !== note.id))
                    }}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <form action="" onSubmit={saveNote}>
          <input type="text" value={title} placeholder="add title" onChange={e => setTitle(e.target.value)} />
          <button type="submit">Save</button>

          <textarea placeholder={placeHolder} value={markdown} onChange={handleChange} cols="50" rows="30" />
          <ReactMarkdown className="preview" children={markdown} />
        </form>
      </div>
      <footer className="footer">
        <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
      </footer>
    </>
  )
}

export default App
