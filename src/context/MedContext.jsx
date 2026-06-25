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

    const targetList = lists.find(list => list.id === listId)

    const existed = targetList.items.some(item => med.id === item.id)

    if (existed) return false

    setLists({...list, items: [...list.items, med]})
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
    <MedContext.Provider value={{ lists, addList, renameList, addMedToList, addMedToNewList, removeList }}>
      {children}
    </MedContext.Provider>
  )
}

export function useMed() {
  return useContext(MedContext)
}