import React, {useState} from 'react';
import Card, {CardData} from '../Card/Card';
import {Button, CircularProgress, IconButton} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logoIcon from '../../imgs/logo.png';

import CardService from "../Services/CardService";
import {useLocation, useNavigate} from "react-router-dom";
import AlertsContainer, {AlertData} from "../Alert/AlertsContainer";
import {BackButton} from "../ScorePage/ScorePage.styled";
import {colors, fontConfigs} from "../../global";
import {CardTitle, SendButtonContainer, UserTitle} from "./UserPage.styled";
import {Container, Title} from "../HomePage/HomePage.styled";
import Menu from "../Menu/Menu";
import {Back, FlipContainer, Flipper, Front, LogoIcon} from "../Card/Card.styled";
import {animated, useSpring} from "react-spring";

const cardService = new CardService();
const UserPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const {name, userType, room, player} = location.state;


    const [cardData, setCardData] = useState<CardData>();
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);
    const [loading, setLoading] = useState(false)

    const handleNavigate = (to: string) => {
        navigate(to, {state: {name, room, player}})
    }

    const handleCardSubmit = (cardData: CardData) => {
        setCardData(cardData);
    };

    const handleSubmit = async () => {
        if (!loading && cardData?.title !== undefined && cardData?.answer !== undefined && cardData?.title !== "" && cardData?.answer !== "") {
            setLoading(true)
            await createCard(cardData);
            setLoading(false)
            setFlipped(true)
        } else if (!loading){
            setAlertData({
                message: 'Preencha todos os campos.',
                severity: 'error',
            });
        }
    };

    const createCard = async (cardData: CardData) => {
        try {
            cardData.player = player
            setCardData(cardData)
            await cardService.createCard({
                playerId: player.id,
                title: cardData.title,
                answer: cardData.answer,
                isRightAnswer: userType === 'moderator'
            });

            setAlertData({
                message: 'Definição enviada. Boa sorte!',
                severity: 'success',
            });
            if (userType === "moderator") {
                handleNavigate("/academia_boardgame/moderator")
            }
        } catch (error) {
            console.error('Failed to create Card:', error);
            setAlertData({
                message: 'Falha na criação da definição. Tente novamente.',
                severity: 'error',
            });
        }
    }

    const SendButton = <Button variant="contained" onClick={handleSubmit} sx={{
            fontFamily: fontConfigs.fontFamily,
            textTransform: 'none',
            fontSize: fontConfigs.sizes.normal,
            background: colors.primary,
            width: "319px",
            height: "45px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            border: `1px solid ${colors.primaryStrong}`
        }}>
            {loading ? <CircularProgress color="inherit"/> : "Enviar"}
        </Button>;

    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 0 : 1,
        transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <Container>
            <Menu actions={[ { text: "Consultar pontuação", actionFunction: () => handleNavigate("/academia_boardgame/score") }]}/>
            <BackButton>
                <IconButton sx={{color: colors.primaryStrong}}
                            onClick={() => handleNavigate("/academia_boardgame/choose")}>
                    <ArrowBackIcon/>
                </IconButton>
            </BackButton>

            <UserTitle onClick={() => handleNavigate("/academia_boardgame/choose")}>
                ACADEMIA
            </UserTitle>

            <FlipContainer>
                <Flipper style={{ transform }} onClick={() => flipped? handleFlip() : () => {}}>
                    <Front flipped={flipped}>
                        <animated.div style={{ opacity }}>
                            <Card name={userType === "moderator" ? "Resposta certa" : name}
                                  onUpdate={(cardData: CardData) => handleCardSubmit(cardData)}
                                  minRows={6}
                            />
                        </animated.div>
                    </Front>
                    <Back flipped={flipped}>
                        <animated.div style={{ opacity: opacity.to((o) => 1 - o) }}>
                            <CardTitle> ACADEMIA </CardTitle>
                        </animated.div>
                    </Back>
                </Flipper>
            </FlipContainer>

            <SendButtonContainer>
                {SendButton}
            </SendButtonContainer>
            <AlertsContainer alertData={alertData}/>
        </Container>
    );
};

export default UserPage;