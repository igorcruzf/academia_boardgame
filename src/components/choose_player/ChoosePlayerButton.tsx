import {Button} from "@mui/material";
import React from "react";
import {NavigateOptions, useNavigate} from "react-router-dom";


interface ChoosePlayerButtonProps{
    name: string,
    navigateTo: string

    navigateOptions: NavigateOptions
}
const ChoosePlayerButton: React.FC<ChoosePlayerButtonProps> =  ({name, navigateTo, navigateOptions}) => {
    const navigate = useNavigate();

    return <Button variant="contained" onClick={() => navigate(navigateTo, navigateOptions)} sx={{
        width: "320px",
        height: "45px",
        fontFamily:'Josefin Slab',
        textTransform: 'none',
        fontSize: "28px",
        background: "#AAB2FF",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        color: "black",
        border: "1px solid #071BCF"
    }}>
        {name}
    </Button>

}

export default ChoosePlayerButton;