import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ClinicalContext from "../Context/Clinical/ClinicalContext";
import PetContext from "../Context/Pet/PetContext";

import Modal from "./../Components/Modal";
import Loading from "../Components/Loading";

import "../Styles/Pages/ViewPet.css";
import CardRecord from "../Components/CardRecord";

export default function ViewPet({ id }) {
  const [modal, setModal] = useState({
    modal: false,
    info: {},
  });
  const [input, setInput] = useState({});
  const [edit, editAction] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const petContex = useContext(PetContext);
  const { pet, getPet, deletePet, loading, startLoading } = petContex;

  const clinicalContex = useContext(ClinicalContext);
  const {
    clinical,
    loadingClinical,
    getClinical,
    getRegister,
    addRegister,
    startLoadingClinical,
  } = clinicalContex;

  const handleModal = (record) => {
    setModal({ modal: !modal, info: record });
  };

  useEffect(() => {
    console.log(parseInt(id));
    startLoading();
    getPet(parseInt(id));
    setInput(pet);
    startLoadingClinical();
    getClinical(parseInt(id));
    console.log("C: " + clinical);
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
                navigate('/pets')
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </button>
            <button
              onClick={() => {
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

      {modal.modal ? (
        <Modal>
          <div className="modal">
            <button className="btn-close">
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <h2>
              Fecha:{" "}
              {modal.info && modal.info.id ? modal.info.date : "0000-00-00"}
            </h2>
            <h4>Temperatura: {modal.info && modal.info.id ? modal.info : 0}</h4>
            <h4>Peso: {modal.info && modal.info.id ? modal.info : 0}</h4>
            <h4>
              Frecuencia cardiaca:{" "}
              {modal.info && modal.info.id ? modal.info : "00-00"}
            </h4>
            <div className="data-employee">
              <h3>
                {modal.info && modal.info.id
                  ? modal.info.employee.identification_number
                  : 0}
              </h3>
              <h4>
                {modal.info && modal.info.id
                  ? modal.info.employee.name + modal.info.employee.last_name
                  : ""}
              </h4>
              <p>
                {modal.info && modal.info.id ? modal.info.employee.gender : ""}
              </p>
            </div>
            <p>
              Observacion:{" "}
              {modal.info && modal.info.id ? modal.info.observation : ""}
            </p>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
