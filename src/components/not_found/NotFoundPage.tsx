import React, {useEffect} from 'react';

import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/academia_boardgame")
    }, [navigate]);



    return (
        <div>
            Redirecting to landing page...
        </div>
    );
};

export default NotFoundPage;