// components/Navbar.jsx
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, Link } from "react-router-dom"

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/search")
  }

  const currentPath = location.pathname

  const renderButtons = () => {
    switch(currentPath) {
      case "/login":
        return (
          <>
            <Link to="/register" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
              Register
            </Link>
            <Link to="/search" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
              Search
            </Link>
          </>
        )
      
      case "/register":
        return (
          <>
            <Link to="/login" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
              Login
            </Link>
            <Link to="/search" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
              Search
            </Link>
          </>
        )

      case "/search":
        if (user) {
          return (
            <>
              <button 
                className="h-9 px-4 rounded-xl bg-[#edede9] text-xs font-semibold text-[#353535] transition-all hover:bg-[#353535] hover:text-white active:scale-[0.98] shadow-sm shadow-slate-100/50"
                onClick={() => {
                  logout()
                  toast.success("You have Logout")
                  navigate("/search")
                }}
              >
                Log Out
              </button>
            </>
          )
        }
        else if (!user) {
          return (
            <>
              <Link to="/login" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
                Login
              </Link>
            </>
          )
        }

      case "/lists":
        if (user) {
          return (
            <>
              <button 
                className="h-9 px-4 rounded-xl bg-[#edede9] text-xs font-semibold text-[#353535] transition-all hover:bg-[#353535] hover:text-white active:scale-[0.98] shadow-sm shadow-slate-100/50"
                onClick={() => {
                  logout()
                  toast.success("You have Logout")
                  navigate("/search")
                }}
              >
                Log Out
              </button>
            </>
          )
        }
        else if (!user) {
          return (
            <>
              <Link to="/login" className="bg-white hover:bg-[#edede9] text-[#353535] px-4 py-2 rounded-md font-semibold text-sm transition-colors">
                Login
              </Link>
            </>
          )
        }
    }
  }

  return (
    /* Navbar 外殼：保持懸浮毛玻璃質感 */
    <div className="fixed top-0 left-0 w-full h-16 bg-white/70 backdrop-blur-md border-b border-gray-200/40 shrink-0 z-50">
      <Toaster />

      {/* 💡 關鍵修改點：將原本的 max-w-4xl 改成 max-w-[1200px]，完美與 ListPage 切齊 */}
      <div className="mx-auto h-full max-w-[1200px] w-full px-6 flex items-center justify-between">
        
        {/* 灰灰的高級感 Logo 區 */}
        <h2 
          className="text-lg font-semibold tracking-wide text-slate-700 select-none cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/search")}
        >
          my<span className="font-bold text-slate-400 ml-0.5">Medication</span>
        </h2>

        {/* 右側按鈕區 */}
        {/* {user ? (
          <button 
            className="h-9 px-4 rounded-xl border border-slate-200 bg-white/50 text-xs font-semibold text-[#353535] transition-all hover:bg-slate-50 hover:text-slate-800 active:scale-[0.98] shadow-sm shadow-slate-100/50"
            onClick={() => {
              logout()
              toast.success("You have Logout")
              navigate("/search")
            }}
          >
            Log Out
          </button>
        ) : (
          <button 
            className="h-9 px-4 rounded-xl bg-slate-800 text-xs font-semibold text-white transition-all shadow-sm shadow-slate-900/10 hover:bg-slate-950 active:scale-[0.98]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )} */}

        <div className="flex items-center gap-3">
          {renderButtons()}
        </div>

      </div>
    </div>
  )
}