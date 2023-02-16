import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import OptionsBar from "./../Components/OptionsBar";
import CardPet from "../Components/CardPet";
import Pet from "./Pet";
import PetContext from "../Context/Pet/PetContext";
import ClinicalContext from './../Context/Clinical/ClinicalContext';
import "../Styles/Pages/Home.css";
import Client from "./Client";

export default function Home({ user, toggle }) {

  const petContex = useContext(PetContext);
  const {
    pets,
    getPets
  } = petContex;
  const navigate = useNavigate();

  const { pague } = useParams();

  useEffect(() => {
    getPets()
  }, []);

  return (
    <div className="page-home">
      {user && user.rol ? (
        <>
          <Menu />
          <div className={toggle ? "body-home active" : "body-home"}>
            <OptionsBar pague = {pague} />
            {
              pague 
              ? pague === "pets" 
                ? <Pet />
                : pague === "histores"
                  ? <Client />
                  : pague === "client"
                    ? <Client />
                    : pague === "records"
                      ? <Client />
                      : navigate('/error')
              : <div className="pague-context home-pg">
                <div className="cont-pet-card">
                  {
                    pets && pets.length > 0 
                    ? pets.length > 4 
                      ? <>
                        <CardPet name={pets[0].name} race = {pets[0].race} id={pets[0].id} key={pets[0].id} />
                        <CardPet name={pets[1].name} race = {pets[1].race} id={pets[1].id} key={pets[1].id} />
                        <CardPet name={pets[2].name} race = {pets[2].race} id={pets[2].id} key={pets[2].id} />
                      </>
                      : pets.map( pet => {
                        return <CardPet name={pet.name} race = {pet.race} id={pet.id} key={pet.id} />
                      })
                    : <></> 
                  }
                </div>
                <div className="cont-user-list">
                </div>
                <div className="cont-record-list">
                </div>
              </div>
            }
          </div>
        </>
      ) : (
        <>{navigate("/session/login")}</>
      )}
    </div>
  );
}
