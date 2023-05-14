import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/main/Login";
import Signup from "./components/main/Signup";
import Contact from "./components/main/Contact";
import Home from "./components/main/Home";
import Resetpassword from "./components/main/Resetpassword";
import Dashboard from "./components/admin/Dashboard";
import AdminProfile from "./components/admin/AdminProfile";
import Admin from "./components/admin";
import UserManager from "./components/main/UserManager";
import User from "./components/user";
import Customiser from "./components/user/Customiser";
import Notfound from "./components/main/NotFound";
import Userprofile from "./components/user/Userprofile";
import CheckoutForm from "./components/main/CheckoutForm";
import ProductListing from "./components/main/ProductListing";

import AboutUs from "./components/main/AboutUs";
import ManageOrder from "./components/admin/ManageOrder";

import Navigationbar from "./components/user/Navigationbar";
import UserProfile1 from "./components/main/UserProfile1";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Authorisor from "./auth/AuthUser";
import { useState } from "react";
import UserProvider from "./context/UserProvider";
import MerchMaker from "./components/user/MerchMaker";
import ManageOrders from "./components/user/ManageOrders";
import AdminProvider from "./context/AdminProvider";
import AddProduct from "./components/admin/AddProduct";
import AdminAuthorisor from "./auth/AuthAdmin";
import ManageProduct from "./components/admin/ManageProduct";
import { Toaster } from "react-hot-toast";

function App() {
  const stripe = loadStripe(
    "pk_test_51N7EGGSI0Bq8jDvkIBUHgen3vjVoo2gNWnoeV8cJWYpV7YmotVLQ16fGJ46BlaQmCggAv8veYizobLgmOUEbGtzk00SaycvUef"
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const [currentAdmin, setCurrentAdmin] = useState(
    JSON.parse(sessionStorage.getItem("admin"))
  );

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        <UserProvider currentUser={currentUser}>
          <AdminProvider currentAdmin={currentAdmin}>
            <Routes>
              <Route element={<Navigate to="/main/home" />} path="/" />
              <Route element={<Main />} path="main">
                <Route path="home" element={<Home />} />
                <Route element={<Login />} path="signin" />
                <Route path="signup" element={<Signup />} />
                <Route path="checkoutform" element={<CheckoutForm />} />
                <Route path="contact" element={<Contact />} />
                <Route path="resetpassword" element={<Resetpassword />} />
                <Route path="usermanager" element={<UserManager />} />
                <Route path="productlisting" element={<ProductListing />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="*" element={<Notfound />} />
              </Route>

              <Route
                element={
                  <AdminAuthorisor>
                    <Admin />
                  </AdminAuthorisor>
                }
                path="admin"
              >
                <Route path="manageorder" element={<ManageOrder />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="addmerch" element={<AddProduct />} />
                <Route path="managemerch" element={<ManageProduct />} />
              </Route>

              <Route
                element={
                  <Authorisor>
                    <User />
                  </Authorisor>
                }
                path="user"
              >
                <Route path="customiser/:merchid" element={<MerchMaker />} />
                <Route path="userprofile" element={<Userprofile />} />
                <Route path="userprofile1" element={<UserProfile1 />} />
                <Route path="manageorders" element={<ManageOrders />} />
                {/* <Route path="sidebar" element={<Sidebar />} /> */}
                <Route
                  path="checkout"
                  element={
                    <Elements stripe={stripe}>
                      <CheckoutForm />
                    </Elements>
                  }
                />
                <Route path="navigationbar" element={<Navigationbar />} />
              </Route>
            </Routes>
          </AdminProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
