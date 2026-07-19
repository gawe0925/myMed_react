import { useState, useEffect, useRef } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import { useAuth } from "../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar"
import DynamicPrompt from '../components/DynamicPrompt'
import styles from '../css/ListPage.module.css';


export default function ListPage() {

  const { 
    meds, lists, addList, renameList, addMedToList, isReadyRef,
    addMedToNewList, removeList, isReady, removeMedFromList
   } = useMed()

  const { user, logout } = useAuth()
  const [selectedListId, setSelectedListId] = useState(null)
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
  const [currentList, setCurrentList] = useState([])
  const [currentListItems, setCurrentListItems] = useState([])


  const filtered = keyword.trim() === "" 
    ? [] 
    : meds.filter((med) => 
      med.med_name?.toLowerCase().trim().startsWith(keyword.toLowerCase().trim())
    );

  const existingNames = new Set(currentListItems.map(item => item?.med_name));
  const existingListNames = new Set(lists?.map(list => list?.name));

  // storage selectedList
  useEffect(() => {
    
    if (!selectedListId) return

    const selectedList = lists?.find(list => list.id === Number(selectedListId))

    if (lists.length > 0) {
      setCurrentList(selectedList)
      setCurrentListItems(selectedList.items)
    }
  
  }, [lists, selectedListId])

  const handleAdd = () => {
    if (selectedMed === null) return toast.error("Select a medication")
    
    // create init list
    if (lists.length === 0 && selectedMed !== null) {
      addMedToNewList(selectedMed)
      return
    }

    // set limit for items for each list
    const itemLen = lists.find(list => list.id === Number(selectedListId)).items.length
    if (itemLen >= 10) {
      return toast("⚠️ Maximum items reached")
    }

    const result = addMedToList(Number(selectedListId), selectedMed)
    const listName = lists.find(list => list.id === Number(selectedListId)).name

    if (!result) {toast.error(selectedMed.med_name + " already in list: " + listName)}
  }

  useEffect(() => {
    if (lists.length > 0 && selectedListId === null) {
    setSelectedListId(lists[0].id)
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
                : <select className={styles.listSelect} onChange={(e) => setSelectedListId(e.target.value)}>
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
              // <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center text-sm font-medium text-gray-400">
              //   <DynamicPrompt />
              // </div>
            )}

            <div className={styles.medSearchResults}>
              {keyword !== "" && selectedMed === null && 
              filtered.map((med, index) =>
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
                      {existingNames.has(selectedMed?.med_name)
                      ? <button disabled={true} className={styles.existedItemButton}>
                          Already in {currentList?.name}
                        </button>
                      : <button className={styles.addToListButton} onClick={() => {
                          handleAdd()
                          setSelectedMed(null)
                        }}>Add to {lists.find(list => list.id === Number(selectedListId))?.name}
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        </button>
                      }
                      {/* <button className={styles.button} onClick={() => {
                        handleAdd()
                        setSelectedMed(null)
                      }}>Add to {lists.find(list => list.id === Number(selectedListId))?.name}
                      
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                      </button> */}

                      <button className={styles.clearBtn} onClick={() => setSelectedMed(null)}> 
                        Search Others

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                      </button>
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
                          const currentListName = lists.find(list => list.id === Number(editingListId)).name
                          if (newListName === "") {
                            setEditingListId(null)
                            return toast.error("List name is required !")
                          }
                          // if list name remain the same, do nothing
                          else if (newListName === currentListName) {
                            setEditingListId(null)
                          }
                          else if (newListName.length > 20) {
                            setEditingListId(null)
                            return toast.error("Name cannot exceed 20 characters")
                          }
                          // prevent lists sharing the same name
                          else if (existingListNames.has(newListName)) {
                            setEditingListId(null)
                            return toast.error("A list with this name already exists")
                          }
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
                    onClick={() => {
                      removeList(Number(list.id))
                      // ensure after remove a list, the selectedListId will point to first list in lists
                      if (lists.length > 0) {
                        setSelectedListId(lists[0]?.id)
                      }
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    <span className={styles.btnText}>REMOVE {list.name}</span>
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
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            {/* <span className={styles.btnIcon}>×</span> */}
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