import {CircularProgress} from "@mui/material";
import React from "react";
import {ButtonStyled} from "./Button.styled";
import {colors} from "../../global";

interface ButtonProps{
    handleOnClick: any;
    width?: string;
    height?: string;
    isLoading?: boolean;
    buttonText?: string;
    backgroundColor?: string;
    fontColor?: string;
    borderColor?: string;
    icon?: JSX.Element;
}

export const CustomButton: React.FC<ButtonProps> = (
    {
        handleOnClick,
        width = "319px",
        height = "45px",
        isLoading = false,
        buttonText = "",
        backgroundColor = colors.primary,
        fontColor = colors.white,
        borderColor = colors.primaryStrong,
        icon = <div/>
    } ) => {
    return <ButtonStyled height={height} width={width}
                         onClick={handleOnClick}
                         backgroundColor={backgroundColor}
                         fontColor={fontColor}
                         borderColor={borderColor}
    >
        <div>
            { isLoading ? <CircularProgress color="inherit"/> : buttonText }
            { isLoading ? "" : icon}
        </div>
    </ButtonStyled>;
}
