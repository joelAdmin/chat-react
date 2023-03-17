import { Component, React } from "react";
import axios from 'axios';
import {headers, API, cookies} from '../lib/Lib';
import { useNavigate } from "react-router-dom";

const  Logout = () => {
    const navigate = useNavigate();
    const handleLogout =(e)=>{
        e.preventDefault();
        console.log(cookies.get('token'));
        axios.get(API.urlApi+'logout', {
            headers: {
              responseType: 'blob',
              accept: 'application/json',
              Authorization: 'Bearer '+cookies.get('token')
            },
            data: {},
        }).then(response => {
            console.log(response);
            if(response.data.res){  
                cookies.remove('usuario_id', {path: "/"});
                cookies.remove('token', {path: "/"});   
                localStorage.clear();           
                navigate('/login');
            }else{            
                console.log('error 00010x');
            }
        }).catch(error => {
            console.log('error 00010x close session');
        });
    }

  
    return (
        <div>
            <a className="dropdown-item" href="/#" onClick={handleLogout}>Salir<i className="ri-logout-circle-r-line float-right text-muted"></i></a>
        </div>
     );
    
}

export default Logout;