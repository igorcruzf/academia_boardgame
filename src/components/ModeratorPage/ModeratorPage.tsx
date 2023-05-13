import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Backdrop, CircularProgress, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import StartIcon from '@mui/icons-material/Start';
import {io} from 'socket.io-client';
import Card, {CardData} from '../Card/Card';
import AlertsContainer, {AlertData} from '../Alert/AlertsContainer';
import CardService from '../Services/CardService';
import Deck from "../Deck/Deck";
import {CardListContainer, ModeratorCardContainer, ModeratorTitle} from "./ModeratorPage.styled";
import {colors} from "../../global";
import {Container} from "../HomePage/HomePage.styled";
import Menu from "../Menu/Menu";
import {BackButton} from "../ScorePage/ScorePage.styled";
import {CustomButton} from "../Button/Button";
import RoomService from "../Services/RoomService";

const cardService = new CardService();
const roomService = new RoomService();
const ModeratorPage = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const {name, room, player} = location.state;

    const [cardList, setCardList] = useState<CardData[]>([]);
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);

    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const [stackDeckRender, setStackDeckRender] = useState<boolean>(false)
    const [cardScoreMap, setCardScoreMap] = useState<Map<number, number>>(new Map());
    const handleClose = () => {
        setOpen(false);
    };

    const handleNavigate = (to: string) => {
        navigate(to, {state: {name, room, player}})
    }

    const handleRefresh = async () => {
        try {
            setLoading(true)
            await roomService.nextRound(room, cardScoreMap);
            setAlertData({
                message: 'Respostas resetadas com sucesso!',
                severity: 'success',
            });
            handleNavigate("/academia_boardgame/choose")
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
        const getCards = async () => {
            try {
                const newCardList = await cardService.getCards(room);
                if (newCardList.length !== cardList.length) {
                    setCardList(newCardList);
                    const scoreMap = cardScoreMap;
                    newCardList.forEach((cardData) => {
                        scoreMap.set(cardData.player!.id, 0)
                    });
                    setCardScoreMap(scoreMap);
                    handleClose();
                }
            } catch (error) {
                console.error('Failed to get cards:', error);
                setAlertData({
                    message: 'Falha na busca por definições!',
                    severity: 'error',
                });
            }
        }

        getCards();

        const socket = io('ws://localhost:3001');

        socket.on(`cardsOf${room}`, (newCardList) => {
            setCardList(newCardList);
            const scoreMap = cardScoreMap;
            newCardList.forEach((cardData: CardData) => {
                scoreMap.set(cardData.player!.id, 0)
            });
            setCardScoreMap(scoreMap);
            handleClose();
        });

        return () => {
            socket.disconnect();
        };
    }, [cardList.length, cardScoreMap, room]);

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

    const onSwipe = () => {
        const newCardList = [...cardList]
        const swipedCard = newCardList.shift()
        newCardList.push(swipedCard!)
        setCardList(newCardList)
    }

    const CardList = cardList.map((cardData) =>
            <ModeratorCardContainer key={cardData.id}>
                <Card
                    name={cardData.isRightAnswer ? "Resposta certa" : cardData.player!.name}
                    initialAnswer={cardData.answer}
                    initialTitle={cardData.title}
                    isModerator={true}
                    onUpdateScore={(newScore) =>
                        setCardScoreMap((prevMap) => new Map(prevMap).set(cardData.player!.id, newScore))
                    }
                    initialScore={cardScoreMap.get(cardData.player!.id)}
                />
            </ModeratorCardContainer>
        );

    return (
        <Container>
            <Menu
                actions={[
                    {
                        text: "Consultar pontuação",
                        actionFunction: () => handleNavigate("/academia_boardgame/score")
                    },
                    {
                        text: "Mudar pilha de cartas",
                        actionFunction: () => setStackDeckRender(!stackDeckRender)
                    },
                    {
                        text: "Próxima rodada",
                        actionFunction: handleRefresh,
                        icon: <StartIcon sx={{marginLeft: "10px", marginBottom: "-5px"}}/>,
                        isLoading: loading
                    },
                ]}
            />
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <BackButton>
                <IconButton sx={{color: colors.primaryStrong}}
                            onClick={() => handleNavigate("/academia_boardgame/choose")}>
                    <ArrowBackIcon/>
                </IconButton>
            </BackButton>

            <ModeratorTitle onClick={() => handleNavigate("/academia_boardgame/choose")}>
                ACADEMIA
            </ModeratorTitle>

            <CardListContainer>
                {stackDeckRender ? <Deck cards={cardList} cardScoreMap={cardScoreMap} setCardScoreMap={setCardScoreMap} onSwipe={onSwipe}/> : CardList}
            </CardListContainer>

            <CustomButton backgroundColor={colors.primaryWeak}
                          handleOnClick={handleRandomize}
                          buttonText={"Aleatorizar"}
                          borderColor={colors.primary}
                          fontColor={colors.black}
                          icon={<ShuffleIcon sx={{marginLeft: "10px", marginBottom:"-5px", color: colors.black}}/>}/>
            <AlertsContainer alertData={alertData}/>
        </Container>
    );
};

export default ModeratorPage;
