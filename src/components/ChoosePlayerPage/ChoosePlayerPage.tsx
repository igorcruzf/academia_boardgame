import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Container, Title} from "../HomePage/HomePage.styled";
import {ChoosePlayerText, ModeratorButtonContainer} from "./ChoosePlayerPage.styled";
import {CustomButton} from "../Button/Button";
import {colors} from "../../global";
import Menu from "../Menu/Menu";

const ChoosePlayerPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const {name, room, player} = location.state;
    const handleNavigate = (to: string, userType?: string) => {
        navigate(to, {state: {name, room, userType: userType, player}})
    }

    return (
        <Container>
            <Menu actions={[ { text: "Consultar pontuação", actionFunction: () => handleNavigate("/academia_boardgame/score") }]}/>
            <Title onClick={() => navigate("/academia_boardgame/")}>
                ACADEMIA
            </Title>

            <ChoosePlayerText> Você é? </ChoosePlayerText>

            <CustomButton
                backgroundColor={colors.primaryWeak} fontColor={colors.black}
                handleOnClick={() => handleNavigate("/academia_boardgame/user", "user")}
                buttonText={"Jogador"}
            />

            <ModeratorButtonContainer>
                <CustomButton
                    backgroundColor={colors.primaryWeak} fontColor={colors.black}
                    handleOnClick={() => handleNavigate("/academia_boardgame/user", "moderator")}
                    buttonText={"Moderador"}
                />
            </ModeratorButtonContainer>
        </Container>
    );
};

export default ChoosePlayerPage;