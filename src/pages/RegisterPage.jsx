import toast, { Toaster } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function RegisterPage() {
    const navigate = useNavigate()
    const { user, register } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const errorMessages = {
        "auth/email-already-in-use": "This email address is already in use.",
        "auth/weak-password": "Password must be at least 6 characters long.",
        "auth/invalid-email": "Please enter a valid email address.",
    }

    useEffect(() => {
        if (user) {
            navigate("/search")
        }
    }, [user])
    
    const handleSubmit = async() => {
        setHasSubmitted(true)
        if (hasSubmitted) return toast.error("Can not submitted again")
        
        await register(email, password)

    }

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="main-container">

                <h2>Register</h2>
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} placeholder="Email" />
                <input value={password} type="password" 
                onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder="Password" />
                <button onClick={async() => {
                    if (!email || !password) {
                        toast.error("Enter email and password")
                        return
                    }

                    try {
                        await handleSubmit()
                    } catch (err) {
                        const msg = errorMessages[err.code] || "Something went wrong. Please try again."
                        toast.error(msg)
                        console.error(err.code)
                        setHasSubmitted(false)
                    }

                }}>Register</button>
            </div>
        </div>
    )
}