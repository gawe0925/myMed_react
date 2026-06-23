import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import meds from "../data/medications.json"
import { useMed } from "../context/MedContext"



export default function MainPage() {

    const {lists, addList, renameList} = useMed()
    const [editingId, setEditingId] = useState(null)
    const [newName, setNewName] = useState("")

    return (
      <div>
        <button onClick={() => addList()}>Add List</button>
      
        {lists.map(list => (
          <div key={list.id}>

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



            <p>{list.id}</p>
            {/* <p>{list.name}</p> */}
            <p>{list.items.map(med => (
              <p>{med.name}</p>,
              <p>{med.use_for}</p>
            ))}</p>



          </div>
        ))}

      </div>
    )
}