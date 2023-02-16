import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClinicalContext from "../Context/Clinical/ClinicalContext";
import PetContext from "../Context/Pet/PetContext";

import Modal from "./../Components/Modal";
import Loading from "../Components/Loading";
import Loading2 from './../Components/Loading2';

import "../Styles/Pages/ViewPet.css";
import CardRecord from "../Components/CardRecord";

export default function ViewPet({ id }) {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({});
  const [edit, editAction] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const petContex = useContext(PetContext);
  const { pet, getPet, deletePet, loadingPet, startLoadingPet } = petContex;

  const clinicalContex = useContext(ClinicalContext);
  const {
    clinical,
    loadingClinical,
    getClinical,
    getRegister,
    addRegister,
    startLoadingClinical,
  } = clinicalContex;

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    startLoadingPet();
    getPet(parseInt(id));
    setInput(pet);
    startLoadingClinical();
    getClinical(parseInt(id));
  }, []);

  return (
    <div className="view-pet-page">
      <div className="left-data">
        <button
          className="btn-close-view"
          onClick={() => {
            navigate("/pets");
          }}
        >
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div className="cont-info-pet">
          <div className="img-cont">
            <img
              src="https://i.postimg.cc/vTMN4BrK/mascota-amigable.png"
              alt=""
            />
          </div>
          <div className="info-cont-client-pet">
            {edit ? (
              <>
                <h2>{pet && pet.id ? pet.name : "Nombre mascota"}</h2>
                <h4>{pet && pet.id ? pet.race : "Raza"}</h4>
                <h4>{pet && pet.id ? pet.sex : "Sexo"}</h4>
              </>
            ) : (
              <>
                <h2>{pet && pet.id ? pet.name : "Nombre mascota"}</h2>
                <h4>{pet && pet.id ? pet.race : "Raza"}</h4>
                <h4>{pet && pet.id ? pet.sex : "Sexo"}</h4>
              </>
            )}
            <br />
            <h3>Dueño</h3>
            <h4>
              {pet && pet.id
                ? pet.client.name + " " + pet.client.last_name
                : "Nombre"}
            </h4>
            <p>
              {pet && pet.id
                ? pet.client.identification_number
                : "# identificacion"}
            </p>
            <p>{pet && pet.id ? pet.client.gender : "Genero"}</p>
          </div>
          <div className="options-pet">
            <button
              onClick={() => {
                deletePet(parseInt(id));
                navigate("/pets");
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
            <button
              onClick={() => {
                console.log(edit);
                editAction(!edit);
              }}
            >
              <ion-icon name="create-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="cont-history-clinic">
        {loadingClinical ? (
          <div className="loading-h-c">
            <Loading />
            <h1 className="text-modal">Loading...</h1>
          </div>
        ) : clinical && clinical.register ? (
          clinical.register.map((record) => {
            return (
              <CardRecord
                modal={modal}
                record={record}
                modalHandle={handleModal}
                key={record.id}
              />
            );
          })
        ) : (
          <>
            <h1>No hay datos</h1>
          </>
        )}
      </div>
      {loadingPet ? (
        <Modal>
          <Loading2 />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
