import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useMed } from "../context/MedContext"


export default function PublicRoute({ children }) {

    const { user, loading } = useAuth()
    const { lists } = useMed()

    if (loading) return null

    if (user && lists) {
        return <Navigate to="/lists" />
    }

    else if (user && !lists) {
        return <Navigate to="/search" />
    }

    return children
}