import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { MedProvider } from "./context/MedContext"
import LoginPage from "./pages/LoginPage"
import ListPage from "./pages/ListPage"
import SearchPage from "./pages/SearchPage"
import RegisterPage from "./pages/RegisterPage"
import AuthGate from "./routes/AuthGate"
import LandingPage from "./pages/LandingPage"


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MedProvider>
          <AuthGate>
              <Routes>
                  <Route path="/" element={
                      <LandingPage />
                  } />
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
          </AuthGate>
        </MedProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}