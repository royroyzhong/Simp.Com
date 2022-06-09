// import logo from "./logo.svg";
import OrderTracking from './component/orders/OrderTracking';
import "./App.css";
import Cart from "./component/cart/Cart";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/loginComponent/LoginPage";
import ProfilePage from "./component/profileComponent/ProfilePage";
import ItemInCart from './component/cart/ItemInCart';
// import ChangePassword from "./component/profileComponent/ChangePasswordPage";


function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <ProfilePage /> */}
      {/* <Dashboard /> */}
      <Cart />
      {/* <OrderTracking /> */}
    </div>
  );
}

export default App;
