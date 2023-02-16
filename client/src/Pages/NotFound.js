import React from "react";
import { useNavigate } from "react-router-dom";

import "../Styles/Pages/NoFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-notfound">
      <div class="box-of-star1">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
      <div class="box-of-star2">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
      <div class="box-of-star3">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
      <div class="box-of-star4">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
      <div class="astronaut" data-js="astro">
        <div class="head"></div>
        <div class="arm arm-left"></div>
        <div class="arm arm-right"></div>
        <div class="body">
          <div class="panel"></div>
        </div>
        <div class="leg leg-left"></div>
        <div class="leg leg-right"></div>
        <div class="schoolbag"></div>
      </div>
      <div className="msg-not-found">
        <h1>Pagina no encontrada</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Ir a inicio
        </button>
      </div>
    </div>
  );
}
