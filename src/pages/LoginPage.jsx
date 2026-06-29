import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast, { Toaster } from 'react-hot-toast';



export default function LoginPage() {

    const { user, login, logout, register } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    return (

        <div>
            <Toaster />

            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={() => navigate()}>Register</button>
            <button onClick={async () => {
                if (!email || !password) {
                    toast.error("Enter email and password")
                    return
                }

                try {
                    await login(email, password)
                    navigate("/search")
                } catch (err) {
                    toast.error("Invalid email or password")
                    console.error(err)
                }
            }
            }>Login</button>
        </div>

    )
}
