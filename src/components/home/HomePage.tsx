import React, {useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Button} from "@mui/material";

import './style.css'
import CardService from "../services/CardService";
import {useNavigate} from "react-router-dom";

const cardService = new CardService();
const HomePage = () => {

    const navigate = useNavigate();


    const [cardData, setCardData] = useState<CardData>();

    const handleCardSubmit = (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleSubmit = async () => {
        if(cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.name !== undefined) {
            await cardService.createCard(cardData);
        }
    };

    return (
        <div>
            <div className={"container"}>
                <Card onUpdate={(cardData: CardData) => handleCardSubmit(cardData)}/>
                <div className={"submit"}>
                    <Button variant="contained" onClick={handleSubmit}> Enviar </Button>
                </div>

                <div className={"moderator"}>
                    <Button variant="contained" color={"secondary"} onClick={() => navigate("/academia_boardgame/moderador")} sx={{width:"300px"}}> Tornar-se moderador </Button>
                </div>
            </div>

        </div>
    );
};

export default HomePage;