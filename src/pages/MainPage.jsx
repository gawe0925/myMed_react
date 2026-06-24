import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import meds from "../data/medications.json"
import { useMed } from "../context/MedContext"
import "../css/MainPage.css"


export default function MainPage() {

  const { lists, addList, renameList, addMedToList, addMedToNewList } = useMed()
  const [editingId, setEditingId] = useState(null)
  const [selectedList, setSelectedList] = useState(null)
  const [selectedMed, setSelectedMed] = useState(null)
  const [newName, setNewName] = useState("")
  const [keyword, setKeyword] = useState("")
  

  const filtered = keyword === "" ? [] : meds.filter((med) => 
    med.med_name?.toLowerCase().includes(keyword.toLowerCase()))

  const handleAdd = () => {
    if (lists.length === 0) {
      addMedToNewList(selectedMed)
      return
    }
    addMedToList(selectedList, selectedMed)
  }

  return (
    <div className="main-container">
      <div className="left-panel">
        <input value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
          setSelectedMed(null)
        }} placeholder="Search Medication" />

        {keyword === "" && <p>Any Medication Name to Search</p>}

        {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
          <div key={index} onClick={() => setSelectedMed(med)}>
            <p>{med.med_name}</p>
          </div>
        )}

        {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

        {selectedMed !== null && (
          <div>
            <p>{selectedMed.med_name}</p>
            <p>{selectedMed.keyword}</p>
            <p>{selectedMed.use_for}</p>
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
          setKeyword("")
          setSelectedMed(null)
        }}>Add</button>

        <button onClick={() => addList()}>Add List</button>

      </div>
      <div className="right-panel">
        {lists.map(list => (
          <div key={list.id}>

            {/* change list's name */}
            {editingId === list.id
              ? <input value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => {
                  renameList(editingId, newName)
                  setEditingId(null)
                }}
              />
              : <p onClick={() => {
                setEditingId(list.id)
                setNewName(list.name)
              }}>{list.name}</p>
            }

            {list.items.map((med, index) =>
              <div key={index}>
                <p>{med.med_name}</p>
                <p>{med.keyword}</p>
                <p>{med.use_for}</p>
              </div>
            )}

          </div>

        ))}
      </div>
    </div>
  )
}