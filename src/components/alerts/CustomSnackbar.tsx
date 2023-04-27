import React from 'react';
import {Alert, Snackbar} from '@mui/material';

interface SnackbarProps {
    open: boolean;
    message?: string;
    severity?: "success" | "error";

    onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({open, message, severity, onClose}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
