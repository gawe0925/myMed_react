// components/Navbar.jsx
import { useAuth } from "../context/AuthContext"
import { useNavigate, useLocation, Link } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/search")
  }

  const currentPath = location.pathname
  const isLandingPage = currentPath === "/"

  const renderButtons = () => {
    switch (currentPath) {
      case "/":
        return null

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
    <div className="fixed top-0 left-0 w-full h-16 bg-white/70 backdrop-blur-md border-b border-gray-200/40 shrink-0 z-50">
      <Toaster />

      <div className="mx-auto h-full max-w-[1200px] w-full px-6 grid grid-cols-3 items-center">

        {/* 左側：非 Landing Page 時顯示 */}
        <div className="flex justify-start">
          {!isLandingPage && (
            <h2
              className="text-lg font-semibold tracking-wide text-slate-700 select-none cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              my<span className="font-bold text-slate-400 ml-0.5">Medication</span>
            </h2>
          )}
        </div>

        {/* 中間：只在 Landing Page ("/") 時置中顯示 */}
        <div className="flex justify-center">
          {isLandingPage && (
            <h2
              className="text-lg font-semibold tracking-wide text-slate-700 select-none cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigate("/")}
            >
              my<span className="font-bold text-slate-400 ml-0.5">Medication</span>
            </h2>
          )}
        </div>

        {/* 右側按鈕區 */}
        <div className="flex justify-end items-center gap-3">
          {renderButtons()}
        </div>

      </div>
    </div>
  )
}