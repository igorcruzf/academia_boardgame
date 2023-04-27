import React, {useState} from 'react';

import './style.css'
import ChoosePlayerButton from "./ChoosePlayerButton";
import {useLocation, useNavigate} from "react-router-dom";

const HomePage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;

    return (
        <div>
            <div className={"container"}>
                <div className={"title"} onClick={() => navigate("/academia_boardgame/")} > ACADEMIA </div>

                <div className={"chooseText chooseName"}> Você é? </div>

                <ChoosePlayerButton name={"Jogador"} navigateTo={"/academia_boardgame/user"} navigateOptions={{ state: { name, userType: "user" }}}/>

                <div id={"moderator"}>
                    <ChoosePlayerButton name={"Moderador"} navigateTo={"/academia_boardgame/user"} navigateOptions={{ state: { name, userType: "moderator" }}} />
                </div>

            </div>
        </div>
    );
};

export default HomePage;