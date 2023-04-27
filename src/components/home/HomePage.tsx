import React, {useState} from 'react';

import './style.css'
import {useNavigate} from "react-router-dom";
import {Button, InputAdornment, TextField} from "@mui/material";
import DrawIcon from "@mui/icons-material/Draw";
import AlertsContainer, {AlertData} from "../alerts/AlertsContainer";

const HomePage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = () => {
        if (name !== "") {
            navigate("/academia_boardgame/choose", {state: {name}})
        } else {
            setAlertData({
                message: 'Preencha o seu nome!',
                severity: 'error',
            });
        }
    }

    return (
        <div>
            <div className={"container"}>
                <div id={"homeTitle"}> ACADEMIA</div>

                <div className={"text name"}> Insira seu nome</div>

                <TextField
                    id="standard-textarea"
                    size={"medium"}
                    variant={"standard"}
                    value={name}
                    onChange={handleChangeName}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DrawIcon sx={{color: "#4554DB"}}/>
                            </InputAdornment>
                        ),
                        style: {
                            fontFamily: 'Josefin Slab',
                            fontSize: "18px",
                            color: "black"
                        }
                    }}
                    sx={{width: "300px"}}
                />

                <div className={"text subtitle"}> Blefar é imprescindível...</div>
                <div className={"text"}> Saber é consequência!</div>


                <Button variant="contained" onClick={handleSubmit} sx={{
                    fontFamily: 'Josefin Slab',
                    textTransform: 'none',
                    fontSize: "28px",
                    background: "#4554DB",
                    width: "319px",
                    height: "45px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                    border: "1px solid #071BCF"
                }}>
                    Jogar
                </Button>
                <AlertsContainer alertData={alertData}/>
            </div>
        </div>
    );
};

export default HomePage;