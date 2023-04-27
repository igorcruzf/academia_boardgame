import React, {useEffect, useState} from 'react';
import Card, {CardData} from '../card/Card';
import {Backdrop, Button, CircularProgress, IconButton} from "@mui/material";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import StartIcon from '@mui/icons-material/Start';

import './style.css'
import CardService from "../services/CardService";
import {useLocation, useNavigate} from "react-router-dom";
import AlertsContainer, {AlertData} from "../alerts/AlertsContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const cardService = new CardService();
const ModeratorPage = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const {name} = location.state;

    const [cardList, setCardList] = useState<CardData[]>([]);
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);

    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleRefresh = async () => {
        try {
            setLoading(true)
            await cardService.deleteCards();
            setAlertData({
                message: 'Respostas resetadas com sucesso!',
                severity: 'success',
            });
            navigate("/academia_boardgame/choose", {state: {name}})
        } catch (error) {
            console.error('Failed to delete cards:', error);
            setAlertData({
                message: 'Falha na remoção de respostas!',
                severity: 'error',
            });
        }
        setLoading(false)
    }


    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const newCardList = await cardService.getCards();
                if (newCardList.length !== cardList.length) {
                    setCardList(newCardList);
                    handleClose();
                }
            } catch (error) {
                console.error('Failed to get cards:', error);
                setAlertData({
                    message: 'Falha na busca por definições!',
                    severity: 'error',
                });
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };

    }, [cardList.length]);

    const handleRandomize = async () => {
        const newCardList = [...cardList];
        let currentIndex = newCardList.length, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [newCardList[currentIndex], newCardList[randomIndex]] = [
                newCardList[randomIndex], newCardList[currentIndex]];
        }
        setCardList(newCardList)
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className={"moderatorPageContainer"}>
                <div className={"backButton"}>
                    <IconButton sx={{color: "#071BCF"}}
                                onClick={() => navigate("/academia_boardgame/choose", {state: {name}})}>
                        <ArrowBackIcon/>
                    </IconButton>
                </div>

                <div id={"moderatorTitle"} className={"title"}
                     onClick={() => navigate("/academia_boardgame/")}> ACADEMIA
                </div>

                <div className={"cardListContainer"}>
                    {cardList.map((cardData) =>
                        <div className={"moderatorCard"} key={cardData.id}>
                            <Card initialName={cardData.name}
                                  initialAnswer={cardData.answer}
                                  initialTitle={cardData.title}
                                  isModerator={true}
                            />
                        </div>
                    )}

                    <Button variant="contained" onClick={handleRandomize} sx={{
                        width: "319px", height: "45px", backgroundColor: "#868686",
                        marginBottom: "30px",
                        marginTop: "20px",
                        fontFamily: 'Josefin Slab',
                        textTransform: 'none',
                        fontSize: "28px",
                    }}>
                        Aleatorizar
                        <ShuffleIcon sx={{marginLeft: "10px"}}/>
                    </Button>

                    <Button variant="contained" onClick={handleRefresh} sx={{
                        width: "319px", height: "45px", backgroundColor: "#4554DB",
                        marginBottom: "10px",
                        fontFamily: 'Josefin Slab',
                        textTransform: 'none',
                        fontSize: "28px",
                    }}>
                        {loading? <CircularProgress color="inherit" /> : "Próxima"}
                        {loading? "" : <StartIcon sx={{marginLeft: "10px"}}/> }
                    </Button>
                </div>

            </div>
            <AlertsContainer alertData={alertData}/>
        </div>
    );
};

export default ModeratorPage;


