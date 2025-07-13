// src/components/ProtectedRoute.jsx
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../animations/Spinner";

export default function  ProtectedRoute ({ children }){
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center font-bold p-4">Loading...</div>;

  // ✅ If not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // ✅ User is authenticated, render the protected content
  return <Outlet/>;
}
