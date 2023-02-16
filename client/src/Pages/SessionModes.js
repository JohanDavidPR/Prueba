import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "../Components/Modal";
import Loading from "../Components/Loading";

import UserContext from "../Context/User/UserContext";

import SignIn from "../Components/SignIn";

import "../Styles/Pages/SessionMode.css";

export default function SessionModes({ user }) {
  const navigate = useNavigate();
  const { mode } = useParams();

  const userContex = useContext(UserContext);
  const { loading } = userContex;

  return (
    <div className="page-session">
      {user && user.rol ? (
        navigate("/")
      ) : (
        <>
          <div className="body-session">
            <div className="fondo-info">
              <img src="https://i.postimg.cc/256QJ45h/40796.jpg" alt="" />
            </div>
            {mode === "login" ? <SignIn /> : navigate("/error/")}
          </div>
          {loading ? (
            <Modal>
              <Loading />
              <h1 className="text-modal">Comprobando</h1>
            </Modal>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
