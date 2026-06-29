import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { MedProvider } from "./context/MedContext"
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";


// =============== firebase settings ===============
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCroDbwmsN1DcI6lBoNT7kJsMnAJoIo-VA",
  authDomain: "meds-acd33.firebaseapp.com",
  projectId: "meds-acd33",
  storageBucket: "meds-acd33.firebasestorage.app",
  messagingSenderId: "140840374580",
  appId: "1:140840374580:web:5535d8460a684c398a9561",
  measurementId: "G-RWDMX11PBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// =============== firebase settings ===============



export default function App() {
  return (
    <MedProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/app" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </MedProvider>
  )
}