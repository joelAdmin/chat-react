import React, {useEffect} from "react";
import axios from 'axios';
import {headers, API, cookies} from '../lib/Lib';
import { useNavigate } from "react-router-dom";

const LogoutLoad = () => {
    const navigate = useNavigate();

    const logout = () => {    
        axios.get(process.env.REACT_APP_URL_API+'logout', headers).then(response => {
            if(response.data.res){
                cookies.remove('usuario_id', {path: "/"});
                cookies.remove('token', {path: "/"});
                navigate('/login');
            }else{            
                console.log('error 00010x');
            }
        }).catch(error => {
            console.log('error 00010x close session');
        });
    }

    useEffect(()=>{
        logout();
    },[]);

}


export default LogoutLoad;