// App.jsx (final, minimal)
import { Routes, Route } from "react-router-dom";
import Login    from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Home     from "./pages/user/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import TripDetailsPage from "./pages/user/TripDetailsPage.jsx";
import BookTrip from "./pages/user/BookTrip.jsx"
import TicketModal from "./components/TicketModel.jsx";
import "@fontsource/inter/300.css";
import "@fontsource/inter/600.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";


export default function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/register"       element={<Register />} />
      <Route path="/login"  element={<Login   />} />
      <Route path="/" element={<TicketModal/>} />

      {/* protected wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home/>} />
        <Route path="/view-details/:tripId" element={<TripDetailsPage/>} />
        
      </Route>
    </Routes>
  );
}
