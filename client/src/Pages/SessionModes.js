import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import SignIn from "../Components/SignIn";

import "../Styles/Pages/SessionMode.css";

export default function SessionModes({ user }) {
  const navigate = useNavigate();
  const { mode } = useParams();

  return (
    <div className="page-session">
      {user && user.rol ? (
        navigate("/")
      ) : (
        <div className="body-session">
          <div className="fondo-info">
            <img src="https://i.postimg.cc/256QJ45h/40796.jpg" alt="" />
          </div>
          {mode === "login" ? <SignIn /> : navigate("/error/")}
        </div>
      )}
    </div>
  );
}