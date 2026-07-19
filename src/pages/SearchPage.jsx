import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import DynamicPrompt from '../components/DynamicPrompt'
import '../index.css'

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
    med.med_name?.toLowerCase().trim().startsWith(keyword.toLowerCase().trim()))

  useEffect(() => {
    if (lists.length > 0 && user) {
      navigate("/lists")
    }
  }, [lists])

  return (
    /* app-shell: 滿版、淺灰色優雅背景 */
    <div className="min-h-screen w-full bg-gray-50 flex flex-col pt-20 pb-10 px-4 md:px-6">
      <Toaster />
      <Navbar />

      {/* main-container: 固定寬度,不受內容影響 */}
      <div className="mx-auto w-full max-w-4xl h-[560px] rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5 overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {/* 搜尋輸入框 */}
        <input 
          value={keyword} 
          onChange={(e) => {
            setKeyword(e.target.value)
            setSelectedMed(null)
          }} 
          placeholder="Search Medication" 
          className="h-12 w-full shrink-0 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
        />

        <div className="flex-1 min-h-0 flex flex-col justify-start overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {/* 提示字串區塊 (Empty State) */}
          {keyword === "" && selectedMed === null && (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center text-sm font-medium text-gray-400">
              <span className="mb-1 text-xl opacity-70">🔍</span>
              <p>Any Medication Name to Search</p>
            </div>
            // <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center text-sm font-medium text-gray-400">
            //   <span className="mb-1 text-xl opacity-70">🔍</span>
            //   <DynamicPrompt />
            // </div>
            
          )}

          {/* 查無結果提示 */}
          {keyword !== "" && filtered.length === 0 && (
            <div className="flex flex-1 items-center justify-center text-sm font-medium text-gray-400">
              ❌ No Matched Medication
            </div>
          )}

          {/* 搜尋結果卡片清單 */}
          {keyword !== "" && selectedMed === null && (
            <div className="flex flex-col gap-3 min-w-0"> {/* 新增 min-w-0 */}
              {filtered.map((med, index) => (
                <div 
                  className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all hover:translate-y-0.5 hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)] min-w-0" 
                  key={index} 
                  onClick={() => {
                    setSelectedMed(med)
                    setKeyword("")
                  }}
                >
                  <div className="mb-2 flex text-sm items-start min-w-0"> {/* 新增 min-w-0 */}
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400 pt-0.5">Medication:</span>
                    <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors min-w-0 break-words">
                      {med.med_name}
                    </span>
                  </div>
                  <div className="flex text-sm items-start min-w-0"> {/* 新增 min-w-0 */}
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400 pt-0.5">Indication:</span>
                    <span className="text-gray-600 min-w-0 break-words">{med.keyword}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* selected-med-card: 已選擇藥物詳細卡片 */}
          {selectedMed !== null && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/40 p-6 shadow-[0_4px_12px_rgba(59,130,246,0.02)] animate-fade-in">
              
              {/* 卡片左側:詳細資訊 */}
              <div className="flex flex-col gap-6 flex-1 w-full min-w-0">
                <div className="flex text-sm items-baseline min-w-0"> 
                  <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#868e96]">Medication:</span>
                  <span className="font-bold text-[#353535] font-semibold text-base min-w-0 break-words">{selectedMed.med_name}</span>
                </div>

                <div className="flex text-sm items-baseline min-w-0"> 
                  <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#868e96]">Indication:</span>
                  <span className="text-[#353535] font-semibold min-w-0 break-words">{selectedMed.keyword}</span>
                </div>
                
                <div className="flex text-sm items-baseline min-w-0">
                  <span className="w-28 shrink-0 text-xs font-semibold uppercase tracking-wider text-[#868e96]">Use For:</span>
                  <span className="text-[#353535] font-semibold min-w-0 break-words">{selectedMed.use_for}</span>
                </div>
              </div>
              
              {/* 卡片右側:操作按鈕區 */}
              <div className="flex flex-col gap-6 w-full md:w-auto shrink-0">
                <button 
                  className="h-10 px-6 rounded-xl bg-[#e0e2db] border border-gray-200 text-sm font-semibold text-[#353535] transition-all shadow-sm hover:bg-[#aad576] active:scale-[0.98]" 
                  onClick={() => {
                    if (selectedMed === null) return toast.error("Select a medication")
                    addMedToNewList(selectedMed)
                    navigate("/lists")
                  }}
                >
                  Add to list
                </button>

                <button 
                  className="flex items-center gap-2 h-10 px-6 rounded-xl bg-[#f8f9fa] border border-gray-200 text-sm font-semibold text-[#353535] transition-all shadow-sm hover:bg-[#ffccd5] active:scale-[0.98]" 
                  onClick={() => setSelectedMed(null)}
                >
                  Search Others

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );

}