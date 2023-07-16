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

  // New note function here
  function newNote() {
    let newNote = { id: Date.now(), title: title, content: markdown }
    setNotes(oldNotes => [newNote, ...oldNotes])
    console.log("new note created")
  }

  // Update notes array with saved note
  function saveNote(e) {
    e.preventDefault()
    let updatedNote = { id: Date.now(), title: title, content: markdown }
    let savedNotes = []
    savedNotes = [updatedNote]
    let newlySavedNotes = [...notes]
    newlySavedNotes.shift()
    let allSavedNotes = savedNotes.concat(newlySavedNotes)

    setNotes(allSavedNotes)
    // setNotes(function (notes) {
    //   let newNote = { id: Date.now(), title: title, content: markdown }
    //   notes.shift()
    //   return [newNote, ...notes]
    // })

    console.log("note updated and saved")
  }

  function updateNote(currentNoteId) {
    setNotes(function (notes) {
      const newlyArrangedNotes = []

      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === currentNoteId) {
          newlyArrangedNotes.unshift({ ...notes[i] })
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
          <button onClick={newNote}>New Note</button>
          <h3>Notes:</h3>
          <ul>
            {notes.map(note => {
              return (
                <li key={note.id} id={note.id} onClick={() => updateNote(note.id)} className="sidebar__li">
                  <p>{note.title}</p>

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
          <div className="container">
            <div>
              <input type="text" value={title} placeholder="add title" onChange={e => setTitle(e.target.value)} />
              <button type="submit">Save</button>

              <textarea placeholder={placeHolder} value={markdown} onChange={e => setMarkdown(e.target.value)} cols="50" rows="30" />
            </div>

            <ReactMarkdown className="preview" children={markdown} />
          </div>
        </form>
      </div>
      <footer className="footer">
        <small>{currentYear} Marcus Hugo. Made with 🥵 and ☕️ .</small>
      </footer>
    </>
  )
}

export default App
