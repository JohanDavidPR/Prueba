import React from "react";

import Modal from "./Modal";

import '../Styles/Components/CardRecord.css'

export default function CardRecord({modal, record, modalHandle}) {
  return (
    <div className="CardRecord">
      <div className="card-details">
        <p className="text-title">{record && record.date ? record.date : '0000-00-00'}</p>
        <p className="text-body">Temperatura {record && record.temperature ? record.temperature : 0}</p>
        <p className="text-body">Observacion: {record && record.observation ? record.observation : ""}</p>
      </div>
      <button className="card-button" onClick={() => {
        console.log("cambiar estado")
        modalHandle()
      }}>Mas info</button>
      {modal ? (
        <Modal>
          <div className="modal">
            <button className="btn-close" onClick={() => {
              modalHandle()
            }}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <h2>
              Fecha: {record && record.id ? record.date : "0000-00-00"}
            </h2>
            <h4>Temperatura: {record && record.id ? record.temperature : 0}</h4>
            <h4>Peso: {record && record.id ? record.weight : 0}</h4>
            <h4>
              Frecuencia cardiaca: {record && record.id ? record.heart_rate : "00-00"}
            </h4>
            <div className="data-employee">
              <h3>
                {record && record.id
                  ? record.employee.identification_number
                  : 0}
              </h3>
              <h4>
                {record && record.id
                  ? record.employee.name + record.employee.last_name
                  : ""}
              </h4>
              <p>
                {record && record.id ? record.employee.gender : ""}
              </p>
            </div>
            <p>
              Observacion: {record && record.id ? record.observation : ""}
            </p>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
