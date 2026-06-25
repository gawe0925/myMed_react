import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import meds from "../data/medications.json"
import { useMed } from "../context/MedContext"
import toast, { Toaster } from 'react-hot-toast';


export default function SearchPage() {

  const [keyword, setKeyword] = useState("")
  const [selectedMed, setSelectedMed] = useState(null)
  const { lists, addList, renameList, addMedToList, addMedToNewList } = useMed()
  const notify = () => toast('Here is your toast.')
  const navigate = useNavigate()

  const filtered = keyword === "" ? [] : meds.filter((med) => 
    med.med_name?.toLowerCase().includes(keyword.toLowerCase()))

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search Medication" />
      <button onClick={() => {
        if (selectedMed === null) return toast.error("Select a medication")
        addMedToNewList(selectedMed)
        navigate("/app")
      }}>Add</button>

      {keyword === "" && <p>Any Medication Name to Search</p> }

      {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

      {keyword !== "" && selectedMed === null && filtered.map((med, index) => 
        <div key={index} onClick={() => {
          setSelectedMed(med)
          setKeyword("")
        }}>
          <h4>{med.med_name}</h4>
          <p>Medication For: {med.keyword}</p>
        </div>
      )}

      {selectedMed !== null && (
        <div>
          <h4>{selectedMed.med_name}</h4>
          <p>Disease: {selectedMed.keyword}</p>
          <p>Use For: {selectedMed.use_for}</p>
        </div>
      )}
      <Toaster />
    </div>
  )

}