import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import UserPage from "./components/user/UserPage";
import ModeratorPage from "./components/moderator/ModeratorPage";
import HomePage from "./components/home/HomePage";
import ChoosePlayerPage from "./components/choose_player/ChoosePlayerPage";

function App() {
  return (
      <div className="content">
          <div id={"main"}>
              <Routes>
                  <Route path="/academia_boardgame" element={<HomePage/>}/>
                  <Route path="/academia_boardgame/choose" element={<ChoosePlayerPage/>}/>
                  <Route path="/academia_boardgame/user" element={<UserPage/>}/>
                  <Route path="/academia_boardgame/moderator" element={<ModeratorPage/>}/>
              </Routes>
          </div>
      </div>
  );
}

export default App;
