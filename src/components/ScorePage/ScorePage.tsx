import React, {useEffect, useState} from 'react';

import {useLocation, useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ScoreLine, {getTotalScore} from "./line/ScoreLine";
import PlayerService, {Player} from "../Services/PlayerService";

import {
    BackButton, EndGameButtonContainer,
    LabelsContainer,
    PlayerLabel,
    RoundLabel,
    ScoreLinesContainer, ScorePageContainer,
    Subtitle,
    TotalLabel
} from "./ScorePage.styled";
import {colors} from "../../global";
import {Title} from "../HomePage/HomePage.styled";
import {CustomButton} from "../Button/Button";
import RoomService from "../Services/RoomService";

const playerService = new PlayerService();
const roomService = new RoomService();
const ScorePage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {room} = location.state;

    const [players, setPlayers] = useState<Player[]>()
    const [bestScore, setBestScore] = useState<number>(0)
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const handleNavigate = () => {
        navigate(-1);
    }

    useEffect( () => {
        const getPlayers = async () => {
            const players = await playerService.getPlayers(room)
            setPlayers(players)
            setOpen(false)
            return players
        }
        getPlayers().then( (players) =>
            setBestScore(getTotalScore(players[0].scores))
        );
    }, [room])

    function isFirstPlayer(player: Player, bestScore: number): boolean{
        return getTotalScore(player.scores) === bestScore;
    }

    const ScoreLines = (): JSX.Element => {
        return <ScoreLinesContainer>
            {
                players?.map((player, index) =>
                    <ScoreLine player={player} isFirstPlace={isFirstPlayer(player, bestScore)}/>)
            }
        </ScoreLinesContainer>
    }

    const handleNewGame = async () => {
        setLoading(true)
        await roomService.endGame(room)
        const players = await playerService.getPlayers(room)
        setPlayers(players)
        setLoading(false)
    }


    return (
        <ScorePageContainer>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <BackButton>
                <IconButton sx={{color: colors.primaryStrong}}
                            onClick={handleNavigate}>
                    <ArrowBackIcon/>
                </IconButton>
            </BackButton>

            <Title onClick={handleNavigate}> ACADEMIA </Title>

            <Subtitle> Pontuação </Subtitle>

            <LabelsContainer>
                <PlayerLabel> Jogador </PlayerLabel>
                <TotalLabel> Total </TotalLabel>
                <RoundLabel> Rodadas </RoundLabel>
            </LabelsContainer>
            <ScoreLines/>
            <EndGameButtonContainer>
                <CustomButton handleOnClick={handleNewGame} isLoading={loading} buttonText={"Finalizar partida"}/>
            </EndGameButtonContainer>
        </ScorePageContainer>
    );
};

export default ScorePage;