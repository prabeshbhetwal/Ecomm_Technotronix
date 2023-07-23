import "./App.css";

import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin-signup/SignIn";
import SignUp from "./pages/signin-signup/SignUp";
import EmailVerified from "./components/verified/emailVerified";

import Dashboard from "./pages/dashboard/Dashboard";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import Products from "./pages/products/Products";
import PaymentOption from "./pages/payment-option/PaymentOption";

import Customer from "./pages/customer/Customer";
import Orders from "./pages/orders/Orders";
import AdminUser from "./pages/admin-user/AdminUser";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin-verification" element={<EmailVerified />} />

        {/* Private Routes */}
        <Route path="/new-admin" element={<SignUp />} />
        <Route path="/admin-user" element={<AdminUser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/products" element={<Products />} />
        <Route path="/payment-option" element={<PaymentOption />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
