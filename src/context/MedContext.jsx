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
    setLists(lists.map(list => {
    if (list.id === Number(listId)) {
      const existed = list.items.some(item => item.id === med.id)
      if (existed) return list
      return {... list, items: [... list.items, med]}
    }
    return list
    }))
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

  return (
    <MedContext.Provider value={{ lists, addList, renameList, addMedToList, addMedToNewList }}>
      {children}
    </MedContext.Provider>
  )
}

export function useMed() {
  return useContext(MedContext)
}