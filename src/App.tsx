import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import UserPage from "./components/UserPage/UserPage";
import ModeratorPage from "./components/ModeratorPage/ModeratorPage";
import HomePage from "./components/HomePage/HomePage";
import ChoosePlayerPage from "./components/ChoosePlayerPage/ChoosePlayerPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ScorePage from "./components/ScorePage/ScorePage";
import Menu, {Action} from "./components/Menu/Menu";

function App() {
  return (
      <div className="content">
          <div id={"main"}>
              <Routes>
                  <Route path="/academia_boardgame" element={<HomePage/>}/>
                  <Route path="/academia_boardgame/choose" element={<ChoosePlayerPage/>}/>
                  <Route path="/academia_boardgame/user" element={<UserPage/>}/>
                  <Route path="/academia_boardgame/moderator" element={<ModeratorPage/>}/>
                  <Route path="/academia_boardgame/score" element={<ScorePage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
          </div>
      </div>
  );
}

export default App;
