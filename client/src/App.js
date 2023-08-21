import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Login,
  SignUp,
  UserHome,
  AdminHome,
  Constituencies,
  HeaderIndex,
  Constituency,
  CreateConstituency,
  UpdateConstituency,
  Candidates,
  Parties,
  CreateParty,
  UpdateParty,
  Requests,
  RequestCreate
} from "./components/index";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const role = window.localStorage.getItem("role");

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <HeaderIndex role={role} />}
        <Routes>
          <Route
            exact
            path="/"
            element={
              isLoggedIn === "true" ? (
                role === "admin" ? (
                  <AdminHome />
                ) : (
                  <UserHome />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/constituencies" element={<Constituencies />} />
          <Route path="/constituencies/:id" element={<Constituency />} />
          <Route path="/constituencies/new" element={<CreateConstituency />} />
          <Route
            path="/constituencies/:id/edit"
            element={<UpdateConstituency />}
          />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/parties/new" element={<CreateParty />} />
          <Route path="/parties/:id/edit" element={<UpdateParty />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/requests/new" element={<RequestCreate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
