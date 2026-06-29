import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MedProvider } from "./context/MedContext"
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";


export default function App() {
  return (
    <AuthProvider>
      <MedProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/app" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </MedProvider>
    </AuthProvider>
  )
}