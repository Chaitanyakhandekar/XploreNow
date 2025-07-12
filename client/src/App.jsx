// App.jsx (final, minimal)
import { Routes, Route } from "react-router-dom";
import Login    from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home     from "./pages/user/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/"       element={<Register />} />
      <Route path="/login"  element={<Login   />} />

      {/* protected wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home/>} />
      </Route>
    </Routes>
  );
}
