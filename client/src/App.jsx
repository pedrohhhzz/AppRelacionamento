import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  const { checkAuth } = useAuthStore(); // Alterado para checkAuth

  useEffect(() => {
    axios
    checkAuth(); 
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-white
        bg-[linear-gradient(to_right, #f0f0f0_1px, transparent_1px), 
        linear-gradient(to-bottom, #f0f0f0_1px, transparent_1px)] 
        bg-[size:6rem_4rem]"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>

        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
