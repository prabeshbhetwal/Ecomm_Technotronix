import "./App.css";

import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin-signup/SignIn";
import SignUp from "./pages/signin-signup/SignUp";
import EmailVerified from "./components/verified/emailVerified";
import UserProfile from "./pages/profile/UserProfile";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/new-admin" element={<SignUp />} />
        <Route path="/admin-verification" element={<EmailVerified />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
