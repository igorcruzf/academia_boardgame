import React, {useState} from 'react';
import './style.css';
import {InputAdornment, TextField} from "@mui/material";

interface CardProps {
    initialAnswer?: string;
    initialTitle?: string;
    initialName?: string;
    initialScore?: number;
    isModerator?: boolean;
    onUpdate?: (cardData: CardData) => void;
    minRows?: number;
}

export interface CardData {
    id?: number;
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
                                       onUpdate,
                                       minRows = 1
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
            onUpdate({answer, title: event.target.value, name})
        }
    }

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        if (onUpdate) {
            onUpdate({answer, title, name: event.target.value})
        }
    }

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
        if (onUpdate) {
            onUpdate({answer: event.target.value, title, name})
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
                    onChange={handleChangeTitle}
                    InputProps={{
                        readOnly: isModerator,
                        style: {
                            fontFamily: 'Josefin Slab',
                            fontSize: "18px",
                            color: "black"
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Josefin Slab',
                            fontSize: "18px",
                            color: "black"
                        }
                    }}
                    sx={{fieldset: {borderColor: "#071BCF"}}}
                />
            </div>

            <TextField
                id="outlined-textarea"
                label="Definição"
                multiline
                size={"medium"}
                value={answer}
                minRows={minRows}
                onChange={handleChangeAnswer}
                InputProps={{
                    readOnly: isModerator,
                    style: {
                        fontFamily: 'Josefin Slab',
                        fontSize: "28px",
                        color: "black"
                    }
                }}
                InputLabelProps={{
                    style: {
                        fontFamily: 'Josefin Slab',
                        fontSize: "18px",
                        color: "black"
                    }
                }}
                sx={{fieldset: {borderColor: "#071BCF"}}}
            />

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
                        style: {
                            fontFamily: 'Josefin Slab',
                            fontSize: "20px",
                            color: "black"
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            fontFamily: 'Josefin Slab',
                            fontSize: "18px",
                            color: "black"
                        }
                    }}
                    value={score}
                    sx={{
                        input: {
                            textAlign: "center",
                        },
                        visibility: isModerator ? "visible" : "hidden",
                        fieldset: {borderColor: "#071BCF"}
                    }}
                />

                <div className={"cardName"}>
                    <TextField
                        id="outlined-textarea"
                        label="Jogador"
                        size={"small"}
                        value={name}
                        onChange={handleChangeName}
                        InputProps={{
                            readOnly: true,
                            style: {
                                fontFamily: 'Josefin Slab',
                                fontSize: "18px",
                                color: "black"
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                fontFamily: 'Josefin Slab',
                                fontSize: "18px",
                                color: "black"
                            }
                        }}
                        sx={{fieldset: {borderColor: "#071BCF"}}}
                    />
                </div>

            </div>
        </div>

    );
};

export default Card;
