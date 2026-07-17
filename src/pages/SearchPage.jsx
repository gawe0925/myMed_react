import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useMed } from "../context/MedContext"
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext"
import Navbar from "../components/Navbar"
import './index.css'

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

  // return (
  //   <div className="app-shell">

  //     <Toaster />

  //     <Navbar />

  //     <div className="main-container">

  //       <input value={keyword} onChange={(e) => {
  //         setKeyword(e.target.value)
  //         setSelectedMed(null)
  //         }} placeholder="Search Medication" />

  //       {keyword === "" && selectedMed === null && <p>Any Medication Name to Search</p> }

  //       {keyword !== "" && filtered.length === 0 && <p>No Matched Medication</p> }

  //       <div className="med-search-results">
  //         {keyword !== "" && selectedMed === null && filtered.map((med, index) =>
  //           <div className="med-result-card" key={index} onClick={() => {
  //             setSelectedMed(med)
  //             setKeyword("")
  //           }}>
              
  //           <div className="med-detail-row">
  //             <span className="med-detail-label">Medication:</span>
  //             <span className="med-detail-value">{med.med_name}</span>
  //           </div>
  //           <div className="med-detail-row">
  //             <span className="med-detail-label">Use For:</span>
  //             <span className="med-detail-value">{med.use_for}</span>
  //           </div>
  //         </div>
  //         )}


  //         {selectedMed !== null && (
  //           <div className="selected-med-card">
  //             <div className="selected-med-card-left">
  //               <div className="med-detail-row">
  //                 <span className="med-detail-label">Medication:</span>
  //                 <span>{selectedMed.med_name}</span>
  //               </div>
  //               <div className="med-detail-row">
  //                 <span className="med-detail-label">Disease:</span>
  //                 <span>{selectedMed.keyword}</span>
  //               </div>
  //               <div className="med-detail-row">
  //                 <span className="med-detail-label">Use For:</span>
  //                 <span>{selectedMed.use_for}</span>
  //               </div>
  //             </div>
              
  //             <div className="selected-med-card-right">
  //               <div className="selected-med-actions">
  //                 <button className="button" onClick={() => {
  //                   if (selectedMed === null) return toast.error("Select a medication")
  //                   addMedToNewList(selectedMed)
  //                   navigate("/lists")
  //                 }}>Add to list</button>

  //                 <button className="clear-btn" onClick={() => setSelectedMed(null)}> Search Others </button>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // )

return (
  /* app-shell: 滿版、淺灰色優雅背景 */
  <div className="min-h-screen w-full bg-gray-50 flex flex-col pb-10">
    <Toaster />
    <Navbar />

    {/* main-container: 寬度放大到 max-w-4xl，並固定高度 h-[560px] 防跳動 */}
    <div className="mx-auto mt-8 w-full max-w-4xl h-[560px] rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-5">
      
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

      {/* 
        下方所有結果/提示的包裝容器 
        使用 flex-1 自動填滿扣除輸入框後的高度，並加上 overflow-y-auto。
        這樣一來，不管裡面內容怎麼變，外殼高度都會死死鎖定在 560px！
      */}
      <div className="flex-1 min-h-0 flex flex-col justify-start overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        {/* 提示字串區塊 (Empty State)：撐滿容器剩餘高度，置中呈現 */}
        {keyword === "" && selectedMed === null && (
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-4 text-center text-sm font-medium text-gray-400">
            <span className="mb-1 text-xl opacity-70">🔍</span>
            <p>Any Medication Name to Search</p>
          </div>
        )}

        {/* 查無結果提示 */}
        {keyword !== "" && filtered.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-sm font-medium text-gray-400">
            ❌ No Matched Medication
          </div>
        )}

        {/* 搜尋結果卡片清單 (外層已有 overflow-y-auto，這裡只需負責排列) */}
        {keyword !== "" && selectedMed === null && (
          <div className="flex flex-col gap-3">
            {filtered.map((med, index) => (
              <div 
                className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]" 
                key={index} 
                onClick={() => {
                  setSelectedMed(med)
                  setKeyword("")
                }}
              >
                <div className="mb-2 flex text-sm items-start">
                  <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400 pt-0.5">Medication:</span>
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{med.med_name}</span>
                </div>
                <div className="flex text-sm items-start">
                  <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-400 pt-0.5">Use For:</span>
                  <span className="text-gray-600">{med.use_for}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* selected-med-card: 已選擇藥物詳細卡片 */}
        {selectedMed !== null && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/40 p-6 shadow-[0_4px_12px_rgba(59,130,246,0.02)] animate-fade-in">
            
            {/* 卡片左側：詳細資訊 */}
            <div className="flex flex-col gap-3 flex-1 w-full">
              <div className="flex text-sm items-start">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-blue-400/80 pt-0.5">Medication:</span>
                <span className="font-bold text-gray-800 text-lg">{selectedMed.med_name}</span>
              </div>
              <div className="flex text-sm items-start">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-blue-400/80 pt-0.5">Disease:</span>
                <span className="text-gray-700 font-medium">{selectedMed.keyword}</span>
              </div>
              <div className="flex text-sm items-start">
                <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-blue-400/80 pt-0.5">Use For:</span>
                <span className="text-gray-600">{selectedMed.use_for}</span>
              </div>
            </div>
            
            {/* 卡片右側：操作按鈕區 */}
            <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
              <button 
                className="h-10 px-6 rounded-xl bg-blue-500 text-sm font-semibold text-white transition-all shadow-sm shadow-blue-500/10 hover:bg-blue-600 active:scale-[0.98]" 
                onClick={() => {
                  if (selectedMed === null) return toast.error("Select a medication")
                  addMedToNewList(selectedMed)
                  navigate("/lists")
                }}
              >
                Add to list
              </button>

              <button 
                className="h-10 px-6 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 active:scale-[0.98]" 
                onClick={() => setSelectedMed(null)}
              >
                Search Others
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  </div>
);

}