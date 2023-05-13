import React, {useState} from 'react';
import {Player} from "../Services/PlayerService";
import {CardContainer, ScoreAndNameContainer} from "./Card.styled";
import {colors} from "../../global";
import {DefinitionInput, PlayerNameInput, ScoreInput, TitleInput} from "./CardInputs";

interface CardProps {
    initialAnswer?: string;
    initialTitle?: string;
    name?: string;
    initialScore?: number;
    isModerator?: boolean;
    onUpdate?: (cardData: CardData) => void;
    onUpdateScore?: (score: number) => void;
    minRows?: number;
    isMultiline?: boolean;
}

export interface CardData {
    id?: number;
    answer: string;
    title: string;
    player?: Player;
    isRightAnswer?: boolean;
}
const Card: React.FC<CardProps> = ({
                                       initialAnswer = '',
                                       initialTitle = '',
                                       initialScore = 0,
                                       name = "",
                                       isModerator = false,
                                       onUpdate,
                                       minRows = 1,
                                       isMultiline = true,
                                       onUpdateScore
                                   }) => {
    const [score, setScore] = useState(initialScore);
    const [answer, setAnswer] = useState(initialAnswer);
    const [title, setTitle] = useState(initialTitle);

    const handleDecrease = () => {
        if (score > 0) {
            const newScore = score - 1;
            setScore(newScore)
            if (onUpdateScore) {
                onUpdateScore(newScore)
            }
        }
    };

    const handleIncrease = () => {
        const newScore = score + 1;
        setScore(newScore)
        if (onUpdateScore) {
            onUpdateScore(newScore)
        }
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        if (onUpdate) {
            onUpdate({answer, title: event.target.value})
        }
    }

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        if (onUpdate) {
            onUpdate({answer: event.target.value, title})
        }
    }

    return (
        <CardContainer background={ isModerator? colors.secondary : "none"}>
            <TitleInput value={title} onChange={handleChangeTitle} readOnly={isModerator}/>

            <DefinitionInput multiline={isMultiline} value={answer} minRows={minRows} onChange={handleChangeAnswer}
                             readOnly={isModerator}/>

            <ScoreAndNameContainer>
                <ScoreInput onDecrease={handleDecrease} onIncrease={handleIncrease} value={score}
                            moderator={isModerator}/>

                <PlayerNameInput value={name}/>
            </ScoreAndNameContainer>
        </CardContainer>
    );
};

export default Card;
