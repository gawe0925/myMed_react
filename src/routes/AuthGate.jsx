import { useAuth } from "../context/AuthContext"
import { useMed } from "../context/MedContext"


export default function AuthGate({ children }) {

    const { user, loading: authLoading } = useAuth()
    const { lists, isReady: medReady } = useMed()

    if (authLoading || !medReady) {
        return 
    }
    
    return children
}