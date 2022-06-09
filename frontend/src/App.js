// import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/loginComponent/LoginPage";
import ProfilePage from "./component/profileComponent/ProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import ChangePassword from "./component/profileComponent/ChangePasswordPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

      {/* <ProfilePage /> */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
