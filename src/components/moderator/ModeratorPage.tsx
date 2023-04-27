import React, {useEffect, useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Button} from "@mui/material";

import './style.css'
import CardService from "../services/CardService";
import {useNavigate} from "react-router-dom";
import AlertsContainer, {AlertData} from "../alerts/AlertsContainer";

const cardService = new CardService();
const ModeratorPage = () => {
    const navigate = useNavigate();

    const [cardData, setCardData] = useState<CardData>();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [cardList, setCardList] = useState<CardData[]>([]);
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);

    const handleCardSubmit = async (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleRefresh = async () => {
        try{
            await cardService.deleteCards();
            setAlertData({
                message: 'Respostas resetadas com sucesso!',
                severity: 'success',
            });
            setIsSubmitted(false)
        } catch (error) {
            console.error('Failed to delete cards:', error);
            setAlertData({
                message: 'Falha na remoção de respostas!',
                severity: 'error',
            });
        }
    }

    const createCard = async (cardData: CardData) => {
        setIsSubmitted(true)
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
            setIsSubmitted(false)
        }
    }
    const getCards = async () => {
        try {
            const newCardList = await cardService.getCards();
            if(newCardList.length !== cardList.length) {
                setCardList(newCardList);
            }
        } catch (error) {
            console.error('Failed to get cards:', error);
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            const interval = setInterval(() => {
                getCards();
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [isSubmitted]);


    const handleSubmit = async () => {
        if(cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.name !== undefined) {
            await createCard(cardData);
            await getCards();
        }
    };

    const handleRandomize = async () => {
        const newCardList = [...cardList];
        let currentIndex = newCardList.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [newCardList[currentIndex], newCardList[randomIndex]] = [
                newCardList[randomIndex], newCardList[currentIndex]];
        }
        console.log(newCardList)
        setCardList(newCardList)
    }

    return (
        <div>
            <div className={"moderatorPageContainer"}>
                <div className={"container"} style={{display: isSubmitted? "none" : "flex"}}>
                    <Card initialName={"Resposta Certa"} onUpdate={(cardData: CardData) => handleCardSubmit(cardData)}/>
                    <div className={"submit"}>
                        <Button variant="contained" onClick={handleSubmit}> Enviar </Button>
                    </div>
                </div>

                <div className={"cardListContainer"} style={{display: isSubmitted? "flex" : "none"}}>
                    <Button variant="contained" color="secondary" onClick={handleRandomize} sx={{width:"200px",
                        marginBottom:"10px"}}> Randomizar </Button>
                    {cardList.map( (cardData) =>
                        <div className={"moderatorCard"} key={cardData.id}>
                            <Card initialName={cardData.name}
                                  initialAnswer={cardData.answer}
                                  initialTitle={cardData.title}
                                  isModerator={true}
                            />
                        </div>
                    )}
                    <Button variant="contained" onClick={handleRefresh} sx={{width:"100px"}}> Próxima </Button>
                </div>

                <div className={"user"}>
                    <Button variant="contained" color={"secondary"} onClick={() => navigate("/academia_boardgame")} sx={{width:"300px"}}> Tornar-se usuário </Button>
                </div>
            </div>
            <AlertsContainer alertData={alertData} />
        </div>
    );
};

export default ModeratorPage;


