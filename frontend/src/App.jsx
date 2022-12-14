import React from "react";
import "./App.css";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./component/Screens/HomeScreen";
import ProjectScreen from "./component/Screens/ProjectScreen";
import CartScreen from "./component/Screens/CartScreen";
import LoginScreen from "./component/Screens/LoginScreen";
import { RegisterScreen } from "./component/Screens/RegisterScreen";
import { ProfileScreen } from "./component/Screens/ProfileScreen";
import ShippingScreen from "./component/Screens/ShippingScreen";
import BTN from "./component/Screens/BTN";
import PaymentSreen from "./component/Screens/PaymentSreen";
import { PlaceOrderScreen } from "./component/Screens/PlaceOrderScreen";
import OrderScreen from "./component/Screens/OrderScreen";
import UserListScreen from "./component/Screens/UserListScreen";
import { UserEditScreen } from "./component/Screens/UserEditScreen";
import ProductListScreen from "./component/Screens/ProductListScreen";

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes path="/">
            <Route index element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/:id" element={<ProjectScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentSreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            {/* <Route path="/color" element={<BTN />} /> */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
