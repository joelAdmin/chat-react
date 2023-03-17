import React, {useEffect, useState} from 'react';
import { useNavigate, Navigate, useLocation} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    //navigate("/home", {state:{chats:resp.data.result, access: response.data.access, userAuth: response.data.user }}) // lo redireccionamos
    return (<><h1>error 404</h1></>);
}

export default NotFound;