// import logo from "./logo.svg";
import OrderTracking from "./component/orders/SellerOrderTracking";
import "./App.css";
import Login from "./component/loginComponent/LoginPage";
import ProfilePage from "./component/profileComponent/ProfilePage";
import Cart from "./component/cart/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavWrapper from "./component/common/NavWrapper";
import ProductBoard from "./component/sellerDashboard/ProductCompactView";
import ProductPage from "./component/sellerDashboard/ProductDetailView";
import BuyerOrderTracking from "./component/orders/BuyerOrderTracking";
import CustomerPageRightContent from "./component/customerPageComponent/CustomerPageRightContent";
import Dashboard from "./component/sellerDashboard/Dashboard";
import CartWrapper from "./component/cart/CartWrapper";

function App() {
  const render = () => {
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
              path="/user/profile"
              element={wrapper(<ProfilePage />, buyer)}
            />
            <Route
              path="/user/order_tracking"
              element={wrapper(<BuyerOrderTracking />, buyer)}
            />
            <Route
              path="/seller/dashboard"
              element={wrapper(<Dashboard />, seller)}
            />
            <Route
              path="/seller/products/"
              element={wrapper(<ProductBoard />, seller)}
            ></Route>
            <Route
              path="/seller/product/:productId"
              element={wrapper(<ProductPage />, seller)}
            />
            <Route
              path="/seller/order_tracking/"
              element={wrapper(<OrderTracking />, seller)}
            />
            <Route
              path="/seller/product_page/"
              element={wrapper(<ProductPage />, seller)}
            />
            <Route
              path="/buyer/product/:productId"
              element={wrapper(<ProductPage />, buyer)}
            />
            <Route
              path="/seller/profile"
              element={wrapper(<ProfilePage />, seller)}
            />
            <Route 
            path="/user/cart" 
            element={wrapper(<CartWrapper />, buyer)} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };

  const wrapper = (component, role) => (
    <NavWrapper role={role}>{component}</NavWrapper>
  );
  let buyer = "buyer";
  let seller = "seller";
  return render();
}

export default App;
