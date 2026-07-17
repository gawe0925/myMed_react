import { useState, useEffect, useRef } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import { useAuth } from "../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar"
import "../css/ListPage.css"


export default function ListPage() {

  const { 
    meds, lists, addList, renameList, addMedToList, isReadyRef,
    addMedToNewList, removeList, isReady, removeMedFromList
   } = useMed()

  const { user, logout } = useAuth()
  const [selectedList, setSelectedList] = useState(null)
  const [selectedMed, setSelectedMed] = useState(null)
  const [editingListId, setEditingListId] = useState(null)
  const [newListName, setNewListName] = useState("")
  const [keyword, setKeyword] = useState("")
  const [noteListId , setNoteListId ] = useState(null)
  const [listNote, setListNote] = useState("")
  const [removeListId, setRemoveListId] = useState(null)
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const textareaRef = useRef(null)


const filtered = keyword.trim() === "" 
    ? [] 
    : meds.filter((med) => 
      med.med_name?.toLowerCase().trim().startsWith(keyword.toLowerCase().trim())
    );

  const handleAdd = () => {
    if (selectedMed === null) return toast.error("Select a medication")
    
    // create init list
    if (lists.length === 0 && selectedMed !== null) {
      addMedToNewList(selectedMed)
      return
    }

    // set limit for items for each list
    const itemLen = lists.find(list => list.id === Number(selectedList)).items.length
    if (itemLen >= 15) {
      return toast("⚠️ Maximum items reached")
    }

    const result = addMedToList(Number(selectedList), selectedMed)
    const listName = lists.find(list => list.id === Number(selectedList)).name

    if (!result) {toast.error(selectedMed.med_name + " already in list: " + listName)}
  }

  useEffect(() => {
    if (lists.length > 0 && selectedList === null) {
    setSelectedList(lists[0].id)
    }

    else if (lists.length === 0 && isReadyRef) {
      navigate("/search")
    }
  }, [lists, user])

  useEffect(() => {
    if (editingListId !== null) {
      inputRef.current.focus()
    }
  }, [editingListId])

  useEffect(() => {
    if (noteListId !== null) {
      textareaRef.current.focus()
    }
  }, [noteListId])

  console.log()

  return (
    <div className="app-shell">
      <Navbar />

      <div className="context-container">
        <div className="left-panel">

        <Toaster />

          <div className="list-select-row">
            {lists.length === 0
            ? [] 
            : <select className="list-select" onChange={(e) => setSelectedList(e.target.value)}>
              {lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
              </select>
            }

            <button className="list-add-btn" onClick={() => {
              const result = addList()
              if (!result) return toast.error("Login to add more lists")
            }}>New List</button>
          </div>
          
          <input value={keyword} onChange={(e) => {
            setKeyword(e.target.value)
            setSelectedMed(null)
          }} placeholder="Search Medication" />

          {keyword === "" && selectedMed === null && <p className="search-prompt">Search Via Medication Name</p>}
          
          <div className="med-search-results">
            {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
              <div className="med-result-card" key={index} onClick={() => {
                setSelectedMed(med)
                setKeyword("")
              }}>
                
                <div className="med-detail-row">
                  <span className="med-detail-label">Medication:</span>
                  <span className="med-result-name">{med.med_name}</span>
                </div>
                <div className="med-detail-row">
                  <span className="med-detail-label">Indication:</span>
                  <span className="med-result-detail">{med.keyword}</span>
                </div>
              </div>
            )}

            
            {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

            {selectedMed !== null && (
              <div className="selected-med-card">
                <div className="selected-med-card-left">
                  <div className="med-detail-row">
                    <span className="med-detail-label">Medication:</span>
                    <span className="med-result-name">{selectedMed.med_name}</span>
                  </div>
                  <div className="med-detail-row">
                    <span className="med-detail-label">Indication:</span>
                    <span className="med-result-detail">{selectedMed.keyword}</span>
                  </div>
                  <div className="med-detail-row">
                    <span className="med-detail-label">Use For:</span>
                    <span className="med-result-detail">{selectedMed.use_for}</span>
                  </div>
                </div>
                
                <div className="selected-med-card-right">
                  <div className="selected-med-actions">
                    <button className="button" onClick={() => {
                      handleAdd()
                      setSelectedMed(null)
                    }}>Add to {lists.find(list => list.id === Number(selectedList))?.name}</button>

                    <button className="clear-btn" onClick={() => setSelectedMed(null)}> Search Others </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right-panel">
          {lists.map(list => (
            <div className="list-card" key={list.id}>

              <div className="list-card-header">
                {/* change list's name */}
                {editingListId === list.id
                  ? <input 
                      className="list-name-input"
                      placeholder="Name Your List! Such as: Daily Med"
                      ref={inputRef} 
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      onBlur={() => {
                        if (newListName === "") return toast.error("List name is required")
                        
                        else if (newListName.length > 20) return toast.error("Name cannot exceed 20 characters")
                        
                        else{
                          renameList(editingListId, newListName)
                          setEditingListId(null)
                        }
                      }}
                    />
                  : <p className="list-name" onClick={() => {
                      setEditingListId(list.id)
                      setNewListName(list.name)
                    }}>{list.name}</p>
                }

                {/* remove list */}
                <button className="list-card-remove-btn" 
                onClick={() => removeList(Number(list.id))}>
                  <span className="btn-text">REMOVE</span>
                  <span className="btn-icon">×</span>
                </button>

              </div>
              
              <div className="list-card-note">
              {/* Note section */}
              {noteListId === list.id
              ? <textarea className="note-textarea" ref={textareaRef} value={listNote}
                onChange={(e) => setListNote(e.target.value)}
                onBlur={() => setNoteListId(null)}
                />
              : <button className="note-btn" onClick={() => {
                setNoteListId(list.id)
              }}>Note</button>
              }
              </div>
              <div className="list-items-container">
                {list.items.map((med, index) =>
                  <div className="med-item" key={index}>
                    <div className="list-items-left">{index + 1}.</div>
                    <div className="list-items-right">
                      <div className="med-item-header">
                        {/* <h4>{index + 1}. {med.med_name}</h4> */}
                        <div className="med-detail-row">
                          <span className="med-detail-label">Medication:</span>
                          <span className="med-result-name">{med.med_name}</span>
                        </div>
                        <button className="med-item-remove-btn" 
                        onClick={() => {removeMedFromList(list.id, med.id)}}>
                          <span className="btn-icon">×</span>
                        </button>
                      </div>
                      <div className="med-detail-row">
                        <span className="med-detail-label">Indication:</span>
                        <span className="med-result-detail">{med.keyword}</span>
                      </div>
                      <div className="med-detail-row">
                        <span className="med-detail-label">Use For:</span>
                        <span className="med-result-detail">{med.use_for}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          ))}
        </div>
      </div>
    </div>
  )
}