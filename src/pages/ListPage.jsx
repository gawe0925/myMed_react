import { useState, useEffect, useRef } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import { useAuth } from "../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar"
import styles from '../css/ListPage.module.css';


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
    if (itemLen >= 10) {
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

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.appShell}>
        <Navbar />

        <div className={styles.contextContainer}>
          <div className={styles.leftPanel}>

            <Toaster />

            <div className={styles.listSelectRow}>
              {lists.length === 0
                ? []
                : <select className={styles.listSelect} onChange={(e) => setSelectedList(e.target.value)}>
                    {lists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                  </select>
              }

              {<span className={`${styles.counterText} ${lists.length >= 5 ? styles.isMax : styles.isNormal}`}>
                Lists: {lists.length}/5
              </span>}

              <button 
                disabled={lists.length >= 5}
                className={`${styles.listAddBtn} ${lists.length >= 5 ? styles.disabledButton : ''}`}
                onClick={() => {
                const result = addList()
                if (!result) return toast.error("Login to add more lists")
              }}>New List</button>
            </div>

            <input
              className={styles.textInput}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                setSelectedMed(null)
              }}
              placeholder="Search Medication"
            />

            {keyword === "" && selectedMed === null && (
              <p className={styles.searchPrompt}>Search Via Medication Name</p>
            )}

            <div className={styles.medSearchResults}>
              {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
                <div className={styles.medResultCard} key={index} onClick={() => {
                  setSelectedMed(med)
                  setKeyword("")
                }}>

                  <div className={styles.medDetailRow}>
                    <span className={styles.medDetailLabel}>Medication:</span>
                    <span className={styles.medResultName}>{med.med_name}</span>
                  </div>
                  <div className={styles.medDetailRow}>
                    <span className={styles.medDetailLabel}>Indication:</span>
                    <span className={styles.medResultDetail}>{med.keyword}</span>
                  </div>
                </div>
              )}

              {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p>}

              {selectedMed !== null && (
                <div className={styles.selectedMedCard}>
                  <div className="selected-med-card-left">
                    <div className={styles.medDetailRow}>
                      <span className={styles.medDetailLabel}>Medication:</span>
                      <span className={styles.medResultName}>{selectedMed.med_name}</span>
                    </div>
                    <div className={styles.medDetailRow}>
                      <span className={styles.medDetailLabel}>Indication:</span>
                      <span className={styles.medResultDetail}>{selectedMed.keyword}</span>
                    </div>
                    <div className={styles.medDetailRow}>
                      <span className={styles.medDetailLabel}>Use For:</span>
                      <span className={styles.medResultDetail}>{selectedMed.use_for}</span>
                    </div>
                  </div>

                  <div className="selected-med-card-right">
                    <div className={styles.selectedMedActions}>
                      <button className={styles.button} onClick={() => {
                        handleAdd()
                        setSelectedMed(null)
                      }}>Add to {lists.find(list => list.id === Number(selectedList))?.name}</button>

                      <button className={styles.clearBtn} onClick={() => setSelectedMed(null)}> Search Others </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.rightPanel}>
            {lists.map(list => (
              <div className={styles.listCard} key={list.id}>

                <div className={styles.listCardHeader}>
                  {editingListId === list.id
                    ? <input
                        className={styles.listNameInput}
                        placeholder="Name Your List! Such as: Daily Med"
                        ref={inputRef}
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        onBlur={() => {
                          if (newListName === "") return toast.error("List name is required")
                          else if (newListName.length > 20) return toast.error("Name cannot exceed 20 characters")
                          else {
                            renameList(editingListId, newListName)
                            setEditingListId(null)
                          }
                        }}
                      />
                    : <p className={styles.listName} onClick={() => {
                        setEditingListId(list.id)
                        setNewListName(list.name)
                      }}>{list.name}</p>
                  }

                  <button className={styles.listCardRemoveBtn}
                    onClick={() => removeList(Number(list.id))}>
                    <span className={styles.btnText}>REMOVE</span>
                    <span className={styles.btnIcon}>×</span>
                  </button>

                </div>

                <div className={styles.listCardNote}>
                  {noteListId === list.id
                    ? <textarea
                        className={styles.noteTextarea}
                        ref={textareaRef}
                        value={listNote}
                        onChange={(e) => setListNote(e.target.value)}
                        onBlur={() => setNoteListId(null)}
                      />
                    : <button className={styles.noteBtn} onClick={() => {
                        setNoteListId(list.id)
                      }}>Note</button>
                  }
                </div>
                <div className={styles.listItemsContainer}>
                  <div className={`${styles.itemCounterText} ${list.items.length >= 10 ? styles.itemMax : styles.itemNormal}`}>
                    Medications: {list.items.length}/10
                  </div>
                  {list.items.map((med, index) =>
                    <div className={styles.medItem} key={index}>
                      <div className={styles.listItemsLeft}>{index + 1}.</div>
                      <div className={styles.listItemsRight}>
                        <div className={styles.medItemHeader}>
                          <div className={styles.medDetailRow}>
                            <span className={styles.medDetailLabel}>Medication:</span>
                            <span className={styles.medResultName}>{med.med_name}</span>
                          </div>
                          <button className={styles.medItemRemoveBtn}
                            onClick={() => { removeMedFromList(list.id, med.id) }}>
                            <span className={styles.btnIcon}>×</span>
                          </button>
                        </div>
                        <div className={styles.medDetailRow}>
                          <span className={styles.medDetailLabel}>Indication:</span>
                          <span className={styles.medResultDetail}>{med.keyword}</span>
                        </div>
                        <div className={styles.medDetailRow}>
                          <span className={styles.medDetailLabel}>Use For:</span>
                          <span className={styles.medResultDetail}>{med.use_for}</span>
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
    </div>
  )
}