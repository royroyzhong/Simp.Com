// import logo from "./logo.svg";
import OrderTracking from './component/orders/OrderTracking';
import "./App.css";
import Cart from "./component/cart/Cart";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/loginComponent/LoginPage";

//import ProfilePage from "./component/profileComponent/ProfilePage";

import ItemInCart from './component/cart/ItemInCart';

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CustomerPage from "./component/customerPageComponent/CustomerPage";

// import ChangePassword from "./component/profileComponent/ChangePasswordPage";


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
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
