import { useState, useEffect } from "react"
import { redirect, useNavigate } from "react-router-dom"

export default function LoginPage() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (

        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={() => navigate("/search")}>Login</button>
        </div>
    )
}
