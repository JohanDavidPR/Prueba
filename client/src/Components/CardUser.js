import React from "react";

import '../Styles/Components/CardUser.css'

export default function CardUser({user}) {
  return (
    <div className="card-user">
      <div className="img">
        <img src="https://i.postimg.cc/tRtSbxfJ/usuario-1.png" alt="" />
      </div>
      <div className="info">
        <span>{user && user.name ? user.name + " " + user.last_name : "Nombre"}</span>
        <p>{user && user.gender ? user.gender : "Genero"}</p>
      </div>
      <button>Button</button>
    </div>
  );
}
