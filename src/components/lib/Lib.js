import React, { Component }  from 'react';
import Pusher from "pusher-js";
import Echo from "laravel-echo";

export const validator =(responseErrors, classFrom)=>{
    const forms = document.querySelectorAll(classFrom);
    const form  = forms[0];
    if(Object.keys(responseErrors).length > 0){[...form.elements].forEach((input) => {
            //console.log(input.name);
            if(input.name !== ''){
                document.getElementsByClassName(input.name)[0].innerHTML= '';
            }                                             
        }); 

        Object.entries(responseErrors).forEach(entry => {
            const [key, value] = entry;
            //console.log(key, value);
            if(key !== ''){
                document.getElementsByClassName(key)[0].innerHTML= value;
            }
        });
    }else
    {
        [...form.elements].forEach((input) => {
            //console.log(input.name);
            if(input.name !== ''){
                document.getElementsByClassName(input.name)[0].innerHTML= '';
            }                                             
        });                    
    }
}

export const ECHO = new Echo({
    broadcaster: "pusher",    
    key: "141115",
    cluster: 'mt1',
    //authEndpoint: "Access-Control-Allow-Origin: https://wss.jlssystem.com/api/broadcasting/auth",
    //authEndpoint: "Access-Control-Allow-Origin: http://localhost:8001/api/broadcasting/auth",
    authEndpoint: "https://api-alp.jlssystem.com/api/broadcasting/auth",
    wsHost: 'wss.jlssystem.com',
    wsPort: 6001,
    wssPort: 6001,
    forceTLS: true,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['wss', 'ws'],
    auth: {
        headers: {
           Authorization: "Bearer " + localStorage.getItem('token'),
           Accept: 'application/json',
        }
    },
})

export const random = () =>{
    const min = 1;
    const max = 10000;
    const random = parseInt(min + (Math.random() * (max - min)));
    return random;
}

//headers Autorization
export const headers = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+localStorage.getItem('token')
    },
    data: {},
}

//headers Autorization post
export const headersPost = {
    headers: {
      method:'POST',
      accept: 'application/json',
      Authorization: 'Bearer '+localStorage.getItem('token')
    },
    data: {},
}

//config API
export const API = {
    urlApi:'https://api-alp.jlssystem.com/api/',
    urlSocket:'https://api-alp.jlssystem.com',
    title:'API REST JL®',
    toke:localStorage.getItem('token')
}

//image default
export const IMG = 'assets/images/users/avatar-1.jpg';

//hora y fecha
let today = new Date();
export const DATE = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
export const HORA = today.getHours() +':'+today.getMinutes()+':'+today.getSeconds();

export const LOCATION = {
    country:'Colombia',
    city:'Bogotá'
}

//diferencia de horas 
export const TIMERMESSAGE = (date_hours) => {
    //console.log('hora:', date_hours);
    var timestamp = Date.parse(date_hours);
    var fecha_params_new = new Date(timestamp);
    let hora_params  = fecha_params_new.getHours()+':'+fecha_params_new.getMinutes()+':'+fecha_params_new.getSeconds(); 
    let fecha_params = fecha_params_new.getFullYear()+'-'+fecha_params_new.getMonth()+'-'+fecha_params_new.getDate();
    //console.log('hora actual:', hora_params);
    //console.log('Fecha actual:', fecha_params);

    let hoy = new Date();
    let horahoy = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
    let fechahoy = hoy.getFullYear()+'-'+hoy.getMonth()+'-'+hoy.getDate();

  
    let fecha = fecha_params;
    let hora  = hora_params;

    let fechaInicio = new Date(fecha).getTime();
    let fechaFin    = new Date(fechahoy).getTime();

    let diff = fechaFin - fechaInicio;

    let dias = diff/(1000*60*60*24);

    if(parseInt(dias) > 0){
        //return {day:dias, hours:0, minutes:0, seconds:0}
        //console.log('dias:', dias);
        return dias+' dias'
    }else{
        var hora1 = hora.split(":");
        var hora2 = horahoy.split(":");
        let t1 = new Date();
        let t2 = new Date();
 
        t1.setHours(hora1[0], hora1[1], hora1[2]);
        t2.setHours(hora2[0], hora2[1], hora2[2]);
 
        //Aquí hago la resta
        t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
        let resul =  (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " horas" : " hora") : "") + (t1.getMinutes() ? ", " + t1.getMinutes() + (t1.getMinutes() > 1 ? " minutos" : " minuto") : "") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " y " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " segundos" : " segundo") : "");
        return resul;
    }   
}

export const HTML = (value) =>{
    return <div dangerouslySetInnerHTML={{ __html:  value }}></div>
}

export const LISTCONVERSATION = (values, key, props) =>{
    return (                        
        <li key={key} className={(values.receptor_id !== props.auth.usuario_id)?'right':''}>
            <div className="conversation-list">
                <div className="chat-avatar">
                    <img src={(values.receptor_id !== props.auth.usuario_id)? values.avatar_emisor : values.avatar_receptor} alt="" />
                </div>

                <div className="user-chat-content">
                    <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                            <div className="mb-0">
                            <div dangerouslySetInnerHTML={{ __html:  values.mensaje }}></div>
                            </div>
                            <p className="chat-time mb-0">
                                <i className="ri-time-line align-middle"></i> 
                                <span className="align-middle">10:00 / {props.auth.usuario_id}</span>
                            </p>
                        </div>
                        <div className="dropdown align-self-start">
                            <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ri-more-2-fill"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/#">Copy <i className="ri-file-copy-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="conversation-name">{values.receptor_id !== props.auth.usuario_id? values.nombre_receptor : values.nombre_emisor}</div>
                </div>
            </div>
        </li>  
        )
}