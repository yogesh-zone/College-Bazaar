import React, { useEffect } from "react";
import Navbar from "./components/Layouts/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import DefaultLoading from "./components/Loading/DefaultLoading";
import animationData from "./components/Animations/404.json";
import AddItem from "./pages/AddItem";
import Footer from "./components/Layouts/Footer";
import Chats from "./pages/Chats";
import { ActivatonPage } from "./pages/ActivatonPage";
import Me from "./pages/Me";
import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";
import { useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="h-screen bg-gray-800 overflow-auto justify-between flex flex-col">
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/me" element={<Me />} />

          <Route
            path="/user/activate/:activation_token"
            element={<ActivatonPage />}
          />
          <Route
            path="*"
            element={<DefaultLoading animationData={animationData} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
