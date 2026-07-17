import { BrowserRouter, Routes, Route  } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { MedProvider } from "./context/MedContext"
import LoginPage from "./pages/LoginPage"
import ListPage from "./pages/ListPage"
import SearchPage from "./pages/SearchPage"
import RegisterPage from "./pages/RegisterPage"
import AuthGate from "./routes/AuthGate"


export default function App() {
  return (
    <AuthProvider>
      <MedProvider>
        <AuthGate>
          <BrowserRouter basename="/myMed_react">
            <Routes>
                <Route path="/login" element={
                    <LoginPage />
                } />
                <Route path="/register" element={
                    <RegisterPage />
                } />
                <Route path="/search" element={
                    <SearchPage />
                } />
                <Route path="/lists" element={
                    <ListPage />
                } />
            </Routes>    
          </BrowserRouter>
        </AuthGate>
      </MedProvider>
    </AuthProvider>
  )
}