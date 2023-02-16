import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import OptionsBar from "./../Components/OptionsBar";
import CardPet from "../Components/CardPet";
import CardUser from "../Components/CardUser";
import Pet from "./Pet";
import PetContext from "../Context/Pet/PetContext";
import ClinicalContext from "./../Context/Clinical/ClinicalContext";
import UserContext from "../Context/User/UserContext";
import "../Styles/Pages/Home.css";
import Client from "./Client";
import Loading2 from "../Components/Loading2";

export default function Home({ user, toggle }) {
  const userContex = useContext(UserContext);
  const { clients, loading, getClients, startLoading } = userContex;

  const petContex = useContext(PetContext);
  const { pets, loadingPet, getPets, startLoadingPet } = petContex;
  const navigate = useNavigate();

  const { pague } = useParams();

  useEffect(() => {
    startLoadingPet();
    getPets();
    startLoading();
    getClients();
  }, []);

  return (
    <div className="page-home">
      {user && user.rol ? (
        <>
          <Menu />
          <div className={toggle ? "body-home active" : "body-home"}>
            <OptionsBar pague={pague} />
            {pague ? (
              pague === "pets" ? (
                <Pet />
              ) : pague === "histores" ? (
                <Client />
              ) : pague === "client" ? (
                <Client />
              ) : pague === "records" ? (
                <Client />
              ) : (
                navigate("/error")
              )
            ) : (
              <div className="pague-context home-pg">
                <div className="cont-pet-card">
                  {!loadingPet ? <PetsTemp pets={pets} /> : <Loading2 />}
                </div>
                <div className="cont-user-list">
                  {!loading ? <UserTemp clients={clients} /> : <Loading2 />}
                </div>
                <div className="cont-record-list"></div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>{navigate("/session/login")}</>
      )}
    </div>
  );
}

const UserTemp = ({ clients }) => {
  return clients && clients.length > 0 ? (
    clients.length > 3 ? (
      <>
        <CardUser
          user={clients[0]}
          key={clients[0].id}
        />
        <CardUser
          user={clients[1]}
          key={clients[1].id}
        />
        <CardUser
          user={clients[2]}
          key={clients[2].id}
        />
      </>
    ) : (
      clients.map((user) => {
        return <CardUser user={user} key={user.id} />;
      })
    )
  ) : (
    <></>
  );
};

const PetsTemp = ({ pets }) => {
  return pets && pets.length > 0 ? (
    pets.length > 3 ? (
      <>
        <CardPet
          name={pets[0].name}
          race={pets[0].race}
          id={pets[0].id}
          key={pets[0].id}
        />
        <CardPet
          name={pets[1].name}
          race={pets[1].race}
          id={pets[1].id}
          key={pets[1].id}
        />
        <CardPet
          name={pets[2].name}
          race={pets[2].race}
          id={pets[2].id}
          key={pets[2].id}
        />
      </>
    ) : (
      pets.map((pet) => {
        return (
          <CardPet name={pet.name} race={pet.race} id={pet.id} key={pet.id} />
        );
      })
    )
  ) : (
    <></>
  );
};
