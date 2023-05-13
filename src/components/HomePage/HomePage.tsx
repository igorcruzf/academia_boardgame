import React, {useState} from 'react';

import {useNavigate, useSearchParams} from "react-router-dom";
import {InputAdornment, TextField} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import AlertsContainer, {AlertData} from "../Alert/AlertsContainer";
import RoomService from "../Services/RoomService";
import PlayerService from "../Services/PlayerService";
import {Container, CreateRoomCustomButton, NameLabel, Subtitle, Text, Title} from "./HomePage.styled";
import {colors, fontConfigs} from "../../global";
import {CustomButton} from "../Button/Button";

const roomService = new RoomService();
const playerService = new PlayerService();
const HomePage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);
    const [loading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const roomQuery = searchParams.get("room")
    const [roomName, setRoomName] = useState(roomQuery? roomQuery : "");

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleChangeRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({room: event.target.value})
        setRoomName(event.target.value);
    }

    const handleSetFeedback = (message: string, severity: 'success' | 'error' = "error") => {
        setAlertData({ message, severity });
    }

    const handleSubmit = async () => {
        async function createPlayer() {
            try {
                const player = await playerService.createPlayer(name, roomName)
                navigate("/academia_boardgame/choose", {state: {name, room: roomName, player}})
            } catch (error) {
                handleCreatePlayerError(error);
            }

            function handleCreatePlayerError(error: unknown) {
                if (error instanceof Error && error.message === "Room doesn't exists") {
                    handleSetFeedback(`Sala ${roomName} não existe.`);
                } else {
                    handleSetFeedback(`Não foi possível se conectar a sala ${roomName}, tente novamente.`);
                }
            }
        }

        if (name !== "" && roomName !== "") {
            if(!loading) {
                setLoading(true)
                await createPlayer();
                setLoading(false)
            }
        } else {
            handleSetFeedback('Preencha o seu nome e a sala a ser acessada!')
        }
    }

    const handleCreateRoomSubmit = async () => {
        async function createRoom() {
            function handleCreateRoomError(error: unknown) {
                if (error instanceof Error && error.message === "Room already exists") {
                    handleSetFeedback(`Sala ${roomName} já existe.`);
                } else {
                    handleSetFeedback(`Não foi possível criar a sala, tente novamente.`);
                }
            }

            try {
                await roomService.createRoom(roomName)
                handleSetFeedback(`Sala ${roomName} criada com sucesso!`, 'success');
            } catch (error) {
                handleCreateRoomError(error);
            }
        }

        if (roomName !== "") {
            if(!loading) {
                setLoading(true)
                await createRoom();
                setLoading(false)
            }
        } else {
            handleSetFeedback(`Preencha o nome da sala a ser criada!`);
        }
    }

    const NameInput: JSX.Element = <TextField
            id="standard-textarea"
            size={"medium"}
            value={name}
            placeholder={"Insira seu nome"}
            onChange={handleChangeName}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <DrawIcon sx={{color: colors.primaryStrong}}/>
                    </InputAdornment>
                ),
                style: {
                    fontFamily: fontConfigs.fontFamily,
                    fontSize: fontConfigs.sizes.small,
                    color: fontConfigs.fontColor
                }
            }}
            sx={{width: "300px"}}
        />;

    const RoomInput: JSX.Element = <TextField
            id="standard-textarea"
            size={"medium"}
            value={roomName}
            placeholder={"Insira a sala"}
            onChange={handleChangeRoomName}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <DrawIcon sx={{color: "#4554DB"}}/>
                    </InputAdornment>
                ),
                style: {
                    marginTop: "15px",
                    fontFamily: fontConfigs.fontFamily,
                    fontSize: fontConfigs.sizes.small,
                    color: fontConfigs.fontColor
                }
            }}
            sx={{width: "300px"}}
        />;

    return (
        <Container>
            <Title> ACADEMIA </Title>

            <NameLabel/>

            {NameInput}
            {RoomInput}

            <Subtitle> Blefar é imprescindível... </Subtitle>
            <Text> Saber é consequência! </Text>

            <CustomButton handleOnClick={handleSubmit} buttonText={"Jogar"} isLoading={loading}/>
            <CreateRoomCustomButton>
                <CustomButton handleOnClick={handleCreateRoomSubmit} buttonText={"Criar a sala"} isLoading={loading}/>
            </CreateRoomCustomButton>
            <AlertsContainer alertData={alertData}/>
        </Container>
    );
};

export default HomePage;