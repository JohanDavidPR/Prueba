import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import UserContext from "../Context/User/UserContext";

import "../Styles/Components/Menu.css";

export default function Menu() {
  const userContex = useContext(UserContext);
  const { toggle, closeSession } = userContex;

  const navigate = useNavigate();

  useEffect(() => {

  }, [toggle])

  return (
    <div className={toggle ? "component-menu" : "component-menu active"}>
      <ul>
        <li>
          <Link to="/" className="link">
            <div className="icon">
              <ion-icon name="newspaper"></ion-icon>
            </div>
            <span>Inicio</span>
          </Link>
        </li>
        <li>
          <Link to="/pets" className="link">
            <div className="icon">
              <ion-icon name="home"></ion-icon>
            </div>
            <span>Mascotas</span>
          </Link>
        </li>
        <li>
          <Link to="/client" className="link">
            <div className="icon">
              <ion-icon name="library"></ion-icon>
            </div>
            <span>Clientes</span>
          </Link>
        </li>
        <li>
          <Link to="/histores" className="link">
            <div className="icon">
              <ion-icon name="albums"></ion-icon>
            </div>
            <span>Historias</span>
          </Link>
        </li>        
        <li className="btn-cerrar-sesion">
          <button
            onClick={() => {
              Swal.fire({
                title: "CERRANDO SESION",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
              }).then(() => {
                closeSession();
                navigate("/login");
              });
            }}
            className="link"
          >
            <span>LOG OUT</span>
            <div className="icon">
              <ion-icon name="log-out"></ion-icon>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}
