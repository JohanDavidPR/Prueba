import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import CardPet from "../Components/CardPet";
import PetContext from "./../Context/Pet/PetContext";
import ViewPet from "./ViewPet";

import "../Styles/Pages/Pet.css";

export default function Pet() {
  const [searchParams] = useSearchParams();

  const petContex = useContext(PetContext);
  const { pets, getPets, startLoading } = petContex;

  const navigate = useNavigate();

  useEffect(() => {
    startLoading();
    getPets();
  }, []);

  return (
    <div className="pague-context">
      {searchParams && searchParams.get("pet") ? (
        <ViewPet id={searchParams.get("pet")} />
      ) : (
        <Pets pets={pets} />
      )}
    </div>
  );
}

const Pets = ({ pets }) => {
  return (
    <div className="cont-card-pet">
      {pets
        ? pets.map((pet) => {
            return (
              <CardPet
                name={pet.name}
                race={pet.race}
                id={pet.id}
                key={pet.id}
              />
            );
          })
        : "No hay mascotas v0"}
    </div>
  );
};
