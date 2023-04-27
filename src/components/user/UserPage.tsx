import React, {useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Button, CircularProgress, IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './style.css'
import CardService from "../services/CardService";
import {useLocation, useNavigate} from "react-router-dom";
import AlertsContainer, {AlertData} from "../alerts/AlertsContainer";

const cardService = new CardService();
const UserPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const {name, userType} = location.state;


    const [cardData, setCardData] = useState<CardData>();
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);
    const [loading, setLoading] = useState(false)


    const handleCardSubmit = (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleSubmit = async () => {
        if (!loading && cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.name !== undefined && cardData?.title !== "" && cardData?.answer !== "" && cardData?.name !== "") {
            setLoading(true)
            await createCard(cardData);
            setLoading(false)
        } else if (!loading){
            setAlertData({
                message: 'Preencha todos os campos.',
                severity: 'error',
            });
        }
    };

    const createCard = async (cardData: CardData) => {
        try {
            await cardService.createCard(cardData);
            setAlertData({
                message: 'Definição enviada. Boa sorte!',
                severity: 'success',
            });
            if (userType === "moderator") {
                navigate("/academia_boardgame/moderator", {state: {name}})
            }
        } catch (error) {
            console.error('Failed to create card:', error);
            setAlertData({
                message: 'Falha na criação da definição. Tente novamente.',
                severity: 'error',
            });
        }
    }

    return (
        <div>
            <div id={"userContainer"}>

                <div className={"backButton"}>
                    <IconButton sx={{color: "#071BCF"}}
                                onClick={() => navigate("/academia_boardgame/choose", {state: {name}})}>
                        <ArrowBackIcon/>
                    </IconButton>
                </div>
                <div id={"userTitle"} className={"title"} onClick={() => navigate("/academia_boardgame/")}> ACADEMIA
                </div>

                <Card initialName={userType === "moderator" ? "Resposta certa" : name}
                      onUpdate={(cardData: CardData) => handleCardSubmit(cardData)}
                      minRows={6}
                />
                <div id={"cardSubmit"}>

                    <Button variant="contained" onClick={handleSubmit} sx={{
                        fontFamily: 'Josefin Slab',
                        textTransform: 'none',
                        fontSize: "28px",
                        background: "#4554DB",
                        width: "319px",
                        height: "45px",
                        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                        border: "1px solid #071BCF"
                    }}>
                        {loading? <CircularProgress color="inherit" /> : "Enviar"}
                    </Button>
                </div>
            </div>
            <AlertsContainer alertData={alertData}/>
        </div>
    );
};

export default UserPage;