import React from "react";
import {InputAdornment, TextField} from "@mui/material";
import {colors, fontConfigs} from "../../global";
import {DecreaseButton, IncreaseButton} from "./Card.styled";

export function TitleInput(props: { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, readOnly: boolean }) {
    return <div>
        <TextField
            id="outlined-textarea"
            label="Palavra"
            fullWidth
            size={"small"}
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                readOnly: props.readOnly,
                style: {
                    fontFamily: fontConfigs.fontFamily,
                    fontSize: fontConfigs.sizes.normal,
                    color: fontConfigs.fontColor
                }
            }}
            InputLabelProps={{
                style: {
                    fontFamily: fontConfigs.fontFamily,
                    fontSize: fontConfigs.sizes.small,
                    color: fontConfigs.fontColor
                }
            }}
            sx={{fieldset: {borderColor: colors.primaryStrong}}}
        />
    </div>;
}

export function DefinitionInput(props: { multiline: boolean, value: string, minRows: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, readOnly: boolean }) {
    return <TextField
        id="outlined-textarea"
        label="Definição"
        multiline={props.multiline}
        size={"medium"}
        value={props.value}
        minRows={props.minRows}
        onChange={props.onChange}
        InputProps={{
            readOnly: props.readOnly,
            style: {
                fontWeight: "bold",
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.normal,
                color: fontConfigs.fontColor
            }
        }}
        InputLabelProps={{
            style: {
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.small,
                color: fontConfigs.fontColor
            }
        }}
        sx={{fieldset: {borderColor: colors.primaryStrong}}}
    />;
}

export function ScoreInput(props: { onDecrease: () => void, onIncrease: () => void, value: number, moderator: boolean }) {
    return <TextField
        id="outlined-textarea"
        label="Pontuação"
        size={"small"}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <DecreaseButton onClick={props.onDecrease}> - </DecreaseButton>
                </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                    <IncreaseButton onClick={props.onIncrease}> + </IncreaseButton>
                </InputAdornment>
            ),
            readOnly: true,
            style: {
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.small,
                fontWeight: "bold",
                color: fontConfigs.fontColor
            }
        }}
        InputLabelProps={{
            style: {
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.small,
                color: fontConfigs.fontColor
            }
        }}
        value={props.value}
        sx={{
            input: {
                textAlign: "center",
            },
            display: props.moderator ? "flex" : "none",
            fieldset: {borderColor: colors.primaryStrong}
        }}
    />;
}

export function PlayerNameInput(props: { value: string }) {
    return <TextField
        id="outlined-textarea"
        label="Jogador"
        size={"small"}
        value={props.value}
        InputProps={{
            readOnly: true,
            style: {
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.small,
                color: fontConfigs.fontColor
            }
        }}
        InputLabelProps={{
            style: {
                fontFamily: fontConfigs.fontFamily,
                fontSize: fontConfigs.sizes.small,
                color: fontConfigs.fontColor
            }
        }}
        sx={{
            fieldset: {borderColor: colors.primaryStrong},
            width: "100%"
        }}
    />;
}