/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import UserContext from "../Context/User/UserContext";

import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import SessionModes from "../Pages/SessionModes";

export default function index() {

  const userContex = useContext(UserContext);
  const { user, userStorageAuth, toggle } = userContex;

  useEffect(() => {
    userStorageAuth();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home user={user} toggle={toggle} />} />
        <Route path="/:pague" element={<Home user={user} toggle={toggle} />} />
        <Route path="/session/:mode" element={<SessionModes user={user} />} />
        <Route path="/error" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
