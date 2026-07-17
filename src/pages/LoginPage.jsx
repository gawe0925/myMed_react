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

        {/* 外層 App Shell：維持一致的滿版、優雅淺灰背景，並將內容垂直置中 */}
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
            
            {/* 登入卡片主體：自適應寬度（最大鎖定在 400px，最適合登入頁的黃金比例） */}
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-6">
            
            {/* 標題區 */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
                <p className="mt-1.5 text-sm text-gray-400">Please enter your details to sign in</p>
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

            {/* 按鈕操作區（垂直排列，主按鈕在上） */}
            <div className="flex flex-col gap-2.5 mt-2">
                {/* 登入按鈕（藍色主調） */}
                <button 
                className="h-11 w-full rounded-xl bg-blue-500 text-sm font-semibold text-white transition-all shadow-sm shadow-blue-500/10 hover:bg-blue-600 active:scale-[0.98]"
                onClick={async () => {
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
                }}
                >
                Login
                </button>

                {/* 註冊按鈕（輕量白底） */}
                <button 
                className="h-11 w-full rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-800 active:scale-[0.98]"
                onClick={() => navigate("/register")}
                >
                Register
                </button>
            </div>

            {/* 分隔線與測試帳密提示區 */}
            <div className="mt-2 pt-4 border-t border-gray-100 flex flex-col items-center gap-1 bg-gray-50/60 rounded-xl p-3 text-xs font-medium text-gray-400">
                <span className="text-[10px] uppercase tracking-wider text-gray-400/80 font-bold mb-0.5">Demo Account</span>
                <div className="flex gap-2">
                <span className="text-gray-500 select-all">test@gmail.com</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 select-all">test123</span>
                </div>
            </div>

            </div>
        </div>
    </div>

    )
}
