import { children, createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "./AuthContext"

// firebase
import { db } from "../firebase"
import { collection, getDocs, addDoc, deleteDoc, query, where, doc, setDoc } from "firebase/firestore"

const MedContext = createContext()

export function MedProvider({ children }) {

  const [meds, setMeds] = useState([])

  useEffect(() => {
    const fetchMeds = async () => {
      const snapshot = await getDocs(collection(db, "medications"))
      const data = snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }))
      setMeds(data)
    }
    fetchMeds()
  }, [])

  const { user } = useAuth()

  const [lists, setLists] = useState(JSON.parse(localStorage.getItem("lists")) || [])

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists))
  }, [lists])

  const addList = () => {

    if (!user && lists.length >= 1) return false

    setLists([...lists, {
        id: Date.now(),
        name: `list_${lists.length +1}`,
        items: []
    }
    ])
    return true
  }

  const renameList = (id, newName) => {
    setLists(lists.map(list => list.id === id ? {...list, name: newName} : list))
  }

  const addMedToList = (listId, med) => {

    const targetList = lists.find(list => list.id === listId)

    const existed = targetList.items.some(item => med.id === item.id)

    if (existed) return false

    setLists(lists.map(list => 
      list.id === listId 
      ? {...list, items: [...list.items, med]}
      : list
      ))
    
    return true

  }

  const addMedToNewList = (med) => {
    const newId = Date.now()
    const newList = {
      id: newId,
      name: "list_1",
      items: [med]
    }
    setLists([newList])
  }

  const removeList = (listId) => {
    setLists(lists.filter(list => list.id !== listId))
  }

  return (
    <MedContext.Provider value={{ meds, lists, addList, renameList, addMedToList, addMedToNewList, removeList }}>
      {children}
    </MedContext.Provider>
  )
}

export function useMed() {
  return useContext(MedContext)
}