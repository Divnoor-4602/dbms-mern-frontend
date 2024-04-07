import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userDetails = useSelector((state) => state.userSlice);
  const isLoggedIn = userDetails.loggedIn;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup", { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <>
      <div>{children}</div>
    </>
  );
}
