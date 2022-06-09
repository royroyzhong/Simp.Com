// import logo from "./logo.svg";
import OrderTracking from './component/orders/OrderTracking';
import "./App.css";
import Dashboard from "./component/sellerDashboard/Dashboard";
import Login from "./component/loginComponent/LoginPage";

//import ProfilePage from "./component/profileComponent/ProfilePage";

import ItemInCart from './component/cart/ItemInCart';

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CustomerPage from "./component/customerPageComponent/CustomerPage";
import ProductBoard from "./component/sellerDashboard/ProductCompactView";

// import ChangePassword from "./component/profileComponent/ChangePasswordPage";


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/products/" element={<ProductBoard />} /> 
        </Routes>
      </BrowserRouter> */}

      {/* <ProfilePage /> */}
      {/* <Dashboard /> */}
      {/* <Cart /> */}
      {/*<OrderTracking /> */}
      {/* <CustomerPage /> */}

    </div>
  );
}

export default App;
