import React, {useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Button} from "@mui/material";

import './style.css'
import CardService from "../services/CardService";
import {useNavigate} from "react-router-dom";
import AlertsContainer, {AlertData} from "../alerts/AlertsContainer";

const cardService = new CardService();
const HomePage = () => {

    const navigate = useNavigate();


    const [cardData, setCardData] = useState<CardData>();
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);


    const handleCardSubmit = (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleSubmit = async () => {
        if(cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.name !== undefined) {
            await createCard(cardData);
        }
    };

    const createCard = async (cardData: CardData) => {
        try {
            await cardService.createCard(cardData);
            setAlertData({
                message: 'Resposta criada com sucesso!',
                severity: 'success',
            });
        } catch (error) {
            console.error('Failed to create card:', error);
            setAlertData({
                message: 'Falha na criação da resposta',
                severity: 'error',
            });
        }
    }

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
            <AlertsContainer alertData={alertData} />
        </div>
    );
};

export default HomePage;