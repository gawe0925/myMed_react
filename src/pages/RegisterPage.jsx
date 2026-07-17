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
    /* app-shell: 滿版、淺灰色優雅背景 */
    <div className="min-h-screen w-full bg-gray-50 flex flex-col pb-10 px-4 md:px-6">
        <Toaster />
        <Navbar />

        {/* main-container: 與登入頁面呼應的垂直居中卡片佈局 */}
        <div className="flex-1 flex items-center justify-center mt-8">
        
        {/* 註冊卡片主體：自適應寬度最大 max-w-md */}
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-6">
            
            {/* 標題區 */}
            <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Create Account</h2>
            <p className="mt-1.5 text-sm text-gray-400">Sign up to get started with your medication list</p>
            </div>

            {/* 表單輸入區 */}
            <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <input 
                value={password} 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
                />
            </div>
            </div>

            {/* 按鈕操作區 */}
            <div className="flex flex-col gap-2.5 mt-2">
            {/* 註冊主按鈕 */}
            <button 
                className="h-11 w-full rounded-xl bg-blue-500 text-sm font-semibold text-white transition-all shadow-sm shadow-blue-500/10 hover:bg-blue-600 active:scale-[0.98]"
                onClick={async () => {
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
                }}
            >
                Register
            </button>

            {/* 返回登入按鈕 */}
            <button 
                className="h-11 w-full rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-700 active:scale-[0.98]"
                onClick={() => navigate("/login")}
            >
                Back to Login
            </button>
            </div>

        </div>
        </div>
    </div>
    )
}