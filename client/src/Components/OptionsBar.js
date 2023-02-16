import React, {useContext} from "react";

import UserContext from "../Context/User/UserContext";

import "../Styles/Components/OptionsBar.css";

export default function OptionsBar({ pague }) {

  const userContex = useContext(UserContext);
  const { toggleMenu } = userContex;

  return (
    <div className="component-optionsbar">
      <div className="btn-name-menu">
        <button onClick={() => {
          console.log("click")
          toggleMenu()
        }}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
        <h1>
          {pague
            ? pague === "pets"
              ? "Mascotas"
              : pague === "histores"
              ? "Historias Clinicas"
              : pague === "client"
              ? "Clientes"
              : pague === "records"
              ? "Registros medicos"
              : "Pagina"
            : "Inicio"}
        </h1>
      </div>

      <div className="cont-icon">
        <img
          src="https://i.postimg.cc/28JTJD92/Joe-Uriah-Commission-by-The-Zombie-Cat-on-Deviant-Art.png"
          alt=""
        />
      </div>
    </div>
  );
}
