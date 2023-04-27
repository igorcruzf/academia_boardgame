import React, {useState} from 'react';
import './style.css';
import {Divider, InputAdornment, TextField} from "@mui/material";

interface CardProps {
    initialAnswer?: string;
    initialTitle?: string;
    initialName?: string;
    initialScore?: number;
    isModerator?: boolean;
    onUpdate?: (cardData: CardData) => void;
}

export interface CardData {
    answer: string;
    title: string;
    name: string;
}

const Card: React.FC<CardProps> = ({
                                       initialAnswer = '',
                                       initialTitle = '',
                                       initialScore = 0,
                                       initialName = "",
                                       isModerator = false,
                                       onUpdate
                                   }) => {
    const [score, setScore] = useState(initialScore);
    const [answer, setAnswer] = useState(initialAnswer);
    const [title, setTitle] = useState(initialTitle);
    const [name, setName] = useState(initialName);

    const handleDecrease = () => {
        if (score > 0) {
            setScore(score - 1)
        }
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        if (onUpdate) {
            onUpdate({answer, title, name})
        }
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        if (onUpdate) {
            onUpdate({answer, title, name})
        }
    }

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        if (onUpdate) {
            onUpdate({answer, title, name})
        }
    }

    return (
        <div className="card">
            <div>
                <TextField
                    id="outlined-textarea"
                    label="Palavra"
                    fullWidth
                    size={"small"}
                    value={title}
                    onChange={ handleChangeTitle }
                    InputProps={{
                        readOnly: isModerator
                    }}
                />
            </div>

            <Divider/>

            <TextField
                id="outlined-textarea"
                label="Definição"
                multiline
                size={"medium"}
                value={answer}
                onChange={handleChangeAnswer}
                InputProps={{
                    readOnly: isModerator
                }}
            />

            <Divider/>

            <div className={"scoreAndNameContainer"}>
                <TextField
                    id="outlined-textarea"
                    label="Pontuação"
                    size={"small"}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <button className={"decrease"} onClick={handleDecrease}>-</button>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <button className={"increase"} onClick={() => setScore(score + 1)}>+</button>
                            </InputAdornment>
                        ),
                        readOnly: true,
                    }}
                    value={score}
                    sx={{
                        input: {
                            textAlign: "center",
                        },
                        visibility: isModerator ? "visible" : "hidden"
                    }}
                />

                <div className={"nameContainer"}>
                    <div className={"name"}>
                        <TextField
                            id="outlined-textarea"
                            label="Nome do Jogador"
                            size={"small"}
                            value={name}
                            onChange={handleChangeName}
                            InputProps={{
                                readOnly: isModerator,
                            }}
                        />
                    </div>
                </div>

            </div>


        </div>

    );
};

export default Card;
