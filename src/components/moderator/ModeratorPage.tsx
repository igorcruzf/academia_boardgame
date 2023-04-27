import React, {useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Button} from "@mui/material";

import './style.css'
import CardService from "../services/CardService";
import {useNavigate} from "react-router-dom";

const cardService = new CardService();
const ModeratorPage = () => {
    const navigate = useNavigate();

    const [cardData, setCardData] = useState<CardData>();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [cardList, setCardList] = useState<CardData[]>([]);

    const handleCardSubmit = async (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleRefresh = async () => {
        setIsSubmitted(false)
        await cardService.deleteCards();
    }

    const handleGetCards = async () => {
        const cardList = await cardService.getCards();
        setCardList(cardList);
    }

    const handleSubmit = async () => {
        if(cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.name !== undefined) {
            setIsSubmitted(true)
            await cardService.createCard(cardData);
            const cardList = await cardService.getCards();
            setCardList(cardList);
        }
    };

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
                    <Button variant="contained" color="secondary" onClick={handleGetCards} sx={{width:"200px",
                        marginBottom:"10px"}}> Buscar respostas </Button>
                    {cardList.map( (cardData) =>
                        <div className={"moderatorCard"}>
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
                    <Button variant="contained" color={"secondary"} onClick={() => navigate("/")} sx={{width:"300px"}}> Tornar-se usuário </Button>
                </div>
            </div>
        </div>
    );
};

export default ModeratorPage;


