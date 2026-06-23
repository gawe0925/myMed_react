import { children, createContext, useContext, useState } from "react"

const MedContext = createContext()

export function MedProvider({ children }) {
  const [lists, setLists] = useState([])

  const addList = () => {
    setLists([...lists, {
        id: Date.now(),
        name: `list_${lists.length +1}`,
        items: []
    }
    ])
  }

  const renameList = (id, newName) => {
    setLists(lists.map(list => list.id === id ? {...list, name: newName} : list))
  }

  const addMedToList = (listId, med) => {
    setLists(lists.mpa(list => {
        list.id === id ? {...list, items: [...list.items, med] } : list
    }))
  }

  return (
    <MedContext.Provider value={{ lists, addList, renameList, addMedToList }}>
      {children}
    </MedContext.Provider>
  )
}

export function useMed() {
  return useContext(MedContext)
}