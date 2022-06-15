// import logo from "./logo.svg";
import OrderTracking from "./component/orders/OrderTracking";
import "./App.css";
import Dashboard from "./component/sellerDashboard/Dashboard";
import Login from "./component/loginComponent/LoginPage";
import ProfilePage from "./component/profileComponent/ProfilePage";
import ItemInCart from "./component/cart/ItemInCart";
import Cart from "./component/cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavWrapper from "./component/common/NavWrapper";
import ProductBoard from "./component/sellerDashboard/ProductCompactView";
import ProductPage from "./component/sellerDashboard/ProductDetailView";

import CustomerPageRightContent from "./component/customerPageComponent/CustomerPageRightContent";
import Header from "./component/common/Header";
// import ChangePassword from "./component/profileComponent/ChangePasswordPage";

function App() {
  const wrapper = (component, role) => (
    <NavWrapper role={role}>{component}</NavWrapper>
  );
  let buyer = "buyer";
  let seller = "seller";
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={wrapper(<CustomerPageRightContent />, buyer)}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/userX/profile"
            element={wrapper(<ProfilePage />, buyer)}
          />
          <Route
            path="/sellerX/dashboard"
            element={wrapper(<Dashboard />, seller)}
          />
          <Route
            path="/sellerX/products/"
            element={wrapper(<ProductBoard />, seller)}
          />
          <Route
            path="/sellerX/order_tracking/"
            element={wrapper(<OrderTracking />, seller)}
          />
          <Route
            path="/sellerX/product_page/"
            element={wrapper(<ProductPage />, seller)}
          />
          <Route path="/userX/cart/" element={wrapper(<Cart />, buyer)} />
        </Routes>
      </BrowserRouter>

      {/* <ProfilePage /> */}
      {/* <Dashboard /> */}
      {/* <Cart /> */}
      {/*<OrderTracking /> */}
    </div>
  );
}

export default App;
