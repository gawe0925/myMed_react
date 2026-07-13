import { children, createContext, useContext, useEffect, useState, useRef } from "react"
import { useAuth } from "./AuthContext"

// firebase
import { db } from "../firebase"
import { collection, getDocs, getDoc, addDoc, deleteDoc, query, where, doc, setDoc } from "firebase/firestore"


const MedContext = createContext()

export function MedProvider({ children }) {
  
  const { user } = useAuth()
  const [meds, setMeds] = useState([])
  const [lists, setLists] = useState([])
  const isReadyRef = useRef(false)
  const [isReady, setIsReady] = useState(false)

  // ================== firebase ==================

  useEffect(() => {
    const fetchMeds = async () => {
      const snapshot = await getDocs(collection(db, "medications"))
      const data = snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }))
      setMeds(data)
    }

    fetchMeds()
  }, [])

  // ================== firebase ==================

  useEffect(() => {
    async function initLists(){
      isReadyRef.current = false
      setIsReady(false)

      if (user) {
        const docRef = doc(db, "userLists", user.uid)
        const snapshot = await getDoc(docRef)
        const cloudLists = snapshot.exists()
          ? (snapshot.data().lists ?? [])
          : []
        
        const localLists = JSON.parse(localStorage.getItem("lists") || "[]")
        const localListId = localLists.length !== 0 
        ? localLists[0].id 
        : ""
        //  to check if there is a duplicated list
        const notToMerge = cloudLists.some(list => list.id === localListId)

        if (notToMerge) {
          setLists(cloudLists)
        } else {
          const merged = [...cloudLists, ...localLists]

          setLists(merged)
        }

      } 

      else if (!user && isReady) {
        const localLists = JSON.parse(localStorage.getItem("lists") || "[]")
        setLists(localLists)
      }

      isReadyRef.current = true
      setIsReady(true)
    }

    initLists()

  }, [user])

  useEffect(() =>{
    if (!user || !isReadyRef.current) return

    if (!user && isReady) {
      localStorage.setItem("lists", JSON.stringify(lists))
      console.info("local stream")
    }

    const saveLists = async () => {
        if (!user) return

        await setDoc(doc(db, "userLists", user.uid), {
            lists: lists
        })
        localStorage.removeItem("lists")
        console.info("cloud synced")
    }

    saveLists()

  }, [user, isReady, lists])

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

  const removeMedFromList = (listId, medId) => {

    const targetList = lists.find(list => list.id === listId)

    const existed = targetList.items.some(item => medId === item.id)

    if (!existed) return false

    const filteredItems = targetList.items.filter(med => med.id !== medId)
    if (filteredItems.length === 0) {
      setLists(lists.filter(list => list.id !== targetList.id))
    }
    
    else if (filteredItems.length !== 0) {
      setLists(lists.map(list => 
        list.id === listId
        ? {...list, items: [...list.items.filter(med => med.id !== medId)]}
        : list
      ))
    }

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
    <MedContext.Provider value={{ 
      meds, lists, isReady, isReadyRef, addList, renameList, addMedToList, 
      addMedToNewList, removeList, removeMedFromList
     }}>
      {children}
    </MedContext.Provider>
  )
}

export function useMed() {
  return useContext(MedContext)
}