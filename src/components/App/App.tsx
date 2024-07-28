import All from "@components/All";
import Selected from "@components/Selected";
import React from "react";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import "./App.less";
import { CountriesProvider } from '../../utils/createContext'

export const App = (): JSX.Element => (
  <div className="componentWrapper">
    <CountriesProvider>
    <BrowserRouter>
      <nav className="routingWrapper">
        <NavLink to="/all" className={({ isActive }) => (isActive ? 'active' : '')}>All Countries</NavLink>
        <NavLink to="/selected" className={({ isActive }) => (isActive ? 'active' : '')}>Selected Countries</NavLink>
      </nav>
      <Routes>
        <Route path="/all" element={<All />} />
        <Route path="/selected" element={<Selected />} />
      </Routes>
    </BrowserRouter>
    </CountriesProvider>
  </div>
);
