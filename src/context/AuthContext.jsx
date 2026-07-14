import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged,
    signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword
 } from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    const login = async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password) 
    }

    const logout = async () => {
        await signOut(auth)
    }

    const register = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}