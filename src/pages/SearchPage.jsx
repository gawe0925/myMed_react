import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import "../css/SearchPage.css"

export default function SearchPage() {

  const { 
    meds, lists, addList, renameList, 
    addMedToList, addMedToNewList
   } = useMed()
  
  const [keyword, setKeyword] = useState("")
  const [selectedMed, setSelectedMed] = useState(null)
  const { user, logout } = useAuth()
  const notify = () => toast('Here is your toast.')
  const navigate = useNavigate()

  const filtered = keyword === "" ? [] : meds.filter((med) => 
    med.med_name?.toLowerCase().includes(keyword.toLowerCase()))

  useEffect(() => {
    if (lists.length > 0 && user) {
      navigate("/lists")
    }
  }, [lists])

  return (
    <div className="app-shell">

      <Toaster />

      <Navbar />

      <div className="main-container">

        <input value={keyword} onChange={(e) => {
          setKeyword(e.target.value)
          setSelectedMed(null)
          }} placeholder="Search Medication" />

        {keyword === "" && selectedMed === null && <p>Any Medication Name to Search</p> }

        {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

        <div className="med-search-results">
          {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
            <div className="med-result-card" key={index} onClick={() => {
              setSelectedMed(med)
              setKeyword("")
            }}>
              
            <div className="med-detail-row">
              <span className="med-detail-label">Medication:</span>
              <span className="med-detail-value">{med.med_name}</span>
            </div>
            <div className="med-detail-row">
              <span className="med-detail-label">Use For:</span>
              <span className="med-detail-value">{med.use_for}</span>
            </div>
          </div>
          )}


          {selectedMed !== null && (
            <div className="selected-med-card">
              <div className="selected-med-card-left">
                <div className="med-detail-row">
                  <span className="med-detail-label">Medication:</span>
                  <span>{selectedMed.med_name}</span>
                </div>
                <div className="med-detail-row">
                  <span className="med-detail-label">Disease:</span>
                  <span>{selectedMed.keyword}</span>
                </div>
                <div className="med-detail-row">
                  <span className="med-detail-label">Use For:</span>
                  <span>{selectedMed.use_for}</span>
                </div>
              </div>
              
              <div className="selected-med-card-right">
                <div className="selected-med-actions">
                  <button className="button" onClick={() => {
                    if (selectedMed === null) return toast.error("Select a medication")
                    addMedToNewList(selectedMed)
                    navigate("/lists")
                  }}>Add to list</button>

                  <button className="clear-btn" onClick={() => setSelectedMed(null)}> Search Others </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}