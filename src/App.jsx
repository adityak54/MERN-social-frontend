import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/NewPassword";
const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div className="font-sans">{routes}</div>;
};

export default App;
