import React from "react";

import '../Styles/Components/CardRecord.css'

export default function CardRecord({record, modalHandle}) {
  return (
    <div className="CardRecord">
      <div className="card-details">
        <p className="text-title">{record.date ? record.date : '0000-00-00'}</p>
        <p className="text-body">Temperatura {record.temperature ? record.temperature : 0}</p>
        <p className="text-body">Observacion: {record.observation ? record.observation : ""}</p>
      </div>
      <button className="card-button" onClick={() => {
        console.log("cambiar estado")
        modalHandle(record)
      }}>Mas info</button>
    </div>
  );
}
