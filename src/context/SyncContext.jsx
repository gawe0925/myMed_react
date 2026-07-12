// import { useState, useEffect } from "react"
// import { useAuth } from "./AuthContext"
// import { useMed } from "./MedContext"

// // firebase
// import { db } from "../firebase"
// import { collection, getDoc, addDoc, deleteDoc, query, where, doc, setDoc } from "firebase/firestore"


// export function SyncProvider({ children }) {
//     const { user } = useAuth()
//     const { lists, fireLists } = useMed()
    
//     useEffect(() => {
//         if (!user) return
//         if (lists.length === 0) return
        
//         const mergedList = [...fireLists, ...lists]
        
//         saveLists(mergedList)

//         if (lists) {
//             localStorage.removeItem("lists")
//         }
    
//         console.info("auto synced")
//     }, [user, lists])

//     const saveLists = async (data) => {
//         if (!user) return

//         await setDoc(doc(db, "userLists", user.uid), {
//             lists: data
//         })
//     }

//     return children
//     }