import {Button} from "@mui/material";
import React from "react";
import {NavigateOptions, useNavigate} from "react-router-dom";
import {colors, fontConfigs} from "../../global";


interface ChoosePlayerButtonProps {
    name: string,
    navigateTo: string

    navigateOptions: NavigateOptions
}

const ChoosePlayerButton: React.FC<ChoosePlayerButtonProps> = ({name, navigateTo, navigateOptions}) => {
    const navigate = useNavigate();

    return <Button variant="contained" onClick={() => navigate(navigateTo, navigateOptions)} sx={{
        width: "320px",
        height: "45px",
        fontFamily: `${fontConfigs.fontFamily}`,
        textTransform: 'none',
        fontSize: `${fontConfigs.sizes.normal}`,
        background: `${colors.primaryWeak}`,
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
        color: `${fontConfigs.fontColor}`,
        border: `1px solid ${colors.primaryStrong}`
    }}>
        {name}
    </Button>

}

export default ChoosePlayerButton;