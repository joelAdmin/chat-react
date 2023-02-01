import { Component, React } from "react";
import axios from 'axios';
import {headers, API, cookies} from '../lib/Lib';

class Logout extends Component{
   
    logout =(e)=>{
        e.preventDefault();
        axios.get(API.urlApi+'logout', headers).then(response => {
            if(response.data.res){
                cookies.remove('usuario_id', {path: "/"});
                cookies.remove('token', {path: "/"});
                window.location.href='/';
            }else{            
                console.log('error 00010x');
            }
        }).catch(error => {
            console.log('error 00010x close session');
        });
    }

    render(){
        return (
            <div>
                <a className="dropdown-item" href="/#" onClick={this.logout}>Salir<i className="ri-logout-circle-r-line float-right text-muted"></i></a>
            </div>
        );
    }
}

export default Logout;