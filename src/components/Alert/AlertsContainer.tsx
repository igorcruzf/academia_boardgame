import React, {useEffect, useState} from 'react';
import CustomSnackbar from './CustomSnackbar';

interface AlertsContainerProps {
    alertData?: AlertData;
}

export interface AlertData {
    message: string;
    severity: 'success' | 'error';
}

const AlertsContainer: React.FC<AlertsContainerProps> = ({alertData}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (alertData) {
            setOpen(true);
        }
    }, [alertData]);

    const handleCloseAlert = () => {
        setOpen(false);
    };

    return (
        <CustomSnackbar open={open} message={alertData?.message} severity={alertData?.severity}
                        onClose={handleCloseAlert}/>
    );
};

export default AlertsContainer;
