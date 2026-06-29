import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import meds from "../data/medications.json"
import { useMed } from "../context/MedContext"
import toast, { Toaster } from 'react-hot-toast';
import "../css/MainPage.css"


export default function MainPage() {

  const { lists, addList, renameList, addMedToList, addMedToNewList, removeList } = useMed()
  const [selectedList, setSelectedList] = useState(null)
  const [selectedMed, setSelectedMed] = useState(null)
  const [editingListId, setEditingListId] = useState(null)
  const [newListName, setNewListName] = useState("")
  const [keyword, setKeyword] = useState("")
  const [noteListId , setNoteListId ] = useState(null)
  const [listNote, setListNote] = useState("")
  const [removeListId, setRemoveListId] = useState(null)
  const navigate = useNavigate()

  const filtered = keyword === "" ? [] : meds.filter((med) => 
    med.med_name?.toLowerCase().includes(keyword.toLowerCase()))

  const handleAdd = () => {
    if (selectedMed === null) return toast.error("Select a medication")
    
      // create init list
    if (lists.length === 0 && selectedMed !== null) {
      addMedToNewList(selectedMed)
      return
    }

    // set limit for items for each list
    const itemLen = lists.find(list => list.id === selectedList).items.length
    if (itemLen === 15) {
      return toast("⚠️ Maximum items reached")
    }

    const result = addMedToList(selectedList, selectedMed)
    const listName = lists.find(list => list.id === selectedList).name

    if (!result) {toast.error(selectedMed.med_name + " already in list: " + listName)}
  }

  useEffect(() => {
    if (lists.length > 0 && selectedList === null) {
      setSelectedList(lists[0].id)
    }
    else if (lists.length == 0) {
      navigate("/search")
    }
  }, [lists])

  return (
    <div className="main-container">
      <div className="left-panel">

      <Toaster />

        <input value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
          setSelectedMed(null)
        }} placeholder="Search Medication" />

        {keyword === "" && selectedMed === null && <p>Any Medication Name to Search</p>}

        {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
          <div key={index} onClick={() => {
            setSelectedMed(med)
            setKeyword("")
          }}>
            <p>{med.med_name}</p>
          </div>
        )}

        {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

        {selectedMed !== null && (
          <div>
            <h4>{selectedMed.med_name}</h4>
            <p>Disease: {selectedMed.keyword}</p>
            <p>Use For: {selectedMed.use_for}</p>
          </div>
        )}
        
        {lists.length === 0
        ? [] 
        : <select onChange={(e) => setSelectedList(e.target.value)}>
          {lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
          </select>
        }

        <button onClick={() => {
          handleAdd()
          setSelectedMed(null)
        }}>Add</button>

        <button onClick={() => {
          const result = addList()
          if (!result) return toast.error("Login to add more lists")
        }}>Add List</button>

      </div>
      <div className="right-panel">
        {lists.map(list => (
          <div key={list.id}>

            {/* change list's name */}
            {editingListId === list.id
              ? <input value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onBlur={() => {
                  renameList(editingListId, newListName)
                  setEditingListId(null)
                }}
              />
              : <p onClick={() => {
                setEditingListId(list.id)
                setNewListName(list.name)
              }}>{list.name}</p>
            }

            {/* remove list */}
            <button onClick={() => removeList(list.id)}> X </button>

            {/* Note section */}
            {noteListId === list.id
            ? <textarea value={listNote}
              onChange={(e) => setListNote(e.target.value)}
              onBlur={() => setNoteListId(null)}
              />
            : <button onClick={() => {
              setNoteListId(list.id)
            }}>Note</button>
            }

            {list.items.map((med, index) =>
              <div key={index}>
                <h4>{index + 1}. {med.med_name}</h4>
                <p>Disease: {med.keyword}</p>
                <p>Use For: {med.use_for}</p>
              </div>
            )}

          </div>

        ))}
      </div>
    </div>
  )
}