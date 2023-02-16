import React from "react";
import '../Styles/Components/CardPet.css'
import { useNavigate } from "react-router-dom";

export default function CardPet({name, race, id}) {
    const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-border-top"></div>
      <div className="img">
        <img src="https://i.postimg.cc/Bny7xN5H/pata.png" alt="" />
      </div>
      <span>{name? name : "Nombre"}</span>
      <p className="job">{race ? race : "Raza"}</p>
      <button onClick={() => {
        navigate('/pets/?pet='+id)
      }}>Click</button>
    </div>
  );
}
