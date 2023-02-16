import React, { useEffect, useContext } from "react";
import CardUser from "./../Components/CardUser";
import { useSearchParams, useNavigate } from "react-router-dom";

import '../Styles/Pages/Client.css'

import UserContext from "./../Context/User/UserContext";

export default function Client() {
  const navigate = useNavigate();
  const userContex = useContext(UserContext);
  const { loading, clients, getClients, startLoading } = userContex;

  useEffect(() => {
    startLoading();
    getClients();
  }, []);

  return (
    <div className="pague-context">
      {!loading ? (
        <ClientCard clients={clients} />
      ) : (
        <div className="cont-loading-client">
          <div className="loader-client">
            <div className="wrapper">
              <div className="circle"></div>
              <div className="line-1"></div>
              <div className="line-2"></div>
              <div className="line-3"></div>
              <div className="line-4"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const ClientCard = ({ clients }) => {
  return clients && clients.length > 0 ? (
    clients.map((client) => {
      return <CardUser user={client} key={client.id} />;
    })
  ) : (
    <></>
  );
};
