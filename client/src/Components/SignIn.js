import React, {useEffect} from "react";
import { useState, useContext } from "react";
import "../Styles/Components/SignIn.css";

import UserContext from "./../Context/User/UserContext";

export default function SignIn(props) {
  const userContex = useContext(UserContext);
  const { startLoading, userAuth } = userContex;

  let [input, setInput] = useState({
    identification_number: '',
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const verificar = () => {
    startLoading()
    userAuth(input);
    console.log("click")
  };

  return (
    <div className="component-signin">
      <h1>INGRESAR</h1>
      <div className="contForm">
        <div className="inputUsername">
          <div>
            <ion-icon name="person"></ion-icon>
          </div>
          <label>INCRESE SU NUMERO DE IDENTIFICACION</label>
          <input
            type="number"
            placeholder="Numero de identificacion"
            name="identification_number"
            value={input.identification_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputPassword">
          <div>
            <ion-icon name="lock-closed"></ion-icon>
          </div>
          <label>Password</label>
          <input
            type="password"
            placeholder="PASSWORD"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="contBtn">
        <button
          onClick={() => {
            verificar();
          }}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
