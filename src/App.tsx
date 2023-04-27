import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ModeratorPage from "./components/moderator/ModeratorPage";

function App() {
  return (
      <div className="content">
          <div id={"main"}>
              <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/moderador" element={<ModeratorPage/>}/>
              </Routes>
          </div>
      </div>
  );
}

export default App;
