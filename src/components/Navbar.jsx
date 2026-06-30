// components/Navbar.jsx
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/search")
  }

  return (
    <div className="navbar">

        <Toaster />

        <h2>myMedication</h2>

        {user 
          ? <button onClick={() => {
            logout()
            toast.success("You have Logout")
            navigate("/search")
          }}>Log Out</button>
          : <button onClick={() => {navigate("/login")}}>Login</button>
        }

    </div>
  )
}