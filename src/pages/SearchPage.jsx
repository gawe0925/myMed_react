import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import meds from "../data/medications.json"
import { useMed } from "../context/MedContext"


export default function SearchPage() {

  const [keyword, setKeyword] = useState("")
  const {lists, addMedToList} = useMed()
  // const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const filtered = keyword === "" ? [] : meds.filter((med) => 
    med.med_name?.toLowerCase().includes(keyword.toLowerCase()))

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search Medication" />
      <button onClick={() => navigate("/app")}>Add</button>

      {keyword === "" && <p>Any Medication Name to Search</p> }

      {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }
      
      
      {filtered.map((med, index) => (
        <div key={index}>
          <h1>{med.med_name}</h1>
          <p>{med.keyword}</p>
          <p>{med.use_for}</p>
        </div>
      ))}

    </div>
  )

}