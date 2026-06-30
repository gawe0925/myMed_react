import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MedProvider } from "./context/MedContext"
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/ListPage";
import SearchPage from "./pages/SearchPage";
import PublicRoute from "./routes/PublicRoute";


export default function App() {
  return (
    <AuthProvider>
      <MedProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/search" element={
                <SearchPage />
            } />
            <Route path="/lists" element={
                <ListPage />
            } />
          </Routes>
        </BrowserRouter>
      </MedProvider>
    </AuthProvider>
  )
}