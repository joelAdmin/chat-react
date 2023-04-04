import React, {useEffect, useState} from "react";
import axios from "axios";
import {API, IMG, TIMERMESSAGE, headers} from '../lib/Lib';
import {SpinnerLoadingMinColor as SpinnerLoadColor} from '../helpers/SpinnerLoading';

import {useSelector, useDispatch} from 'react-redux';
import {loading, openChat} from '../../features/user/chatSlice';
import {infoUserTo} from '../../features/user/userToSlice'
import {getConversation} from '../../features/user/conversationSlice';

import Cookies from 'universal-cookie';

const ChatOpenUser = (props) => {
    
    const dispatch = useDispatch();
    const estado = useSelector((state)=>state);

    const [userTo, setUserTo] = useState({});
    const [chats, setChats]   = useState({});
    const [auth, setAuth]     = useState(estado.auth.userAuth);
    const [chatId, setChatId] = useState(0);  
    const [emisorId, setEmisorId] = useState(0);

    const updateUserTo = (data) => { 
        if(auth.usuario_id === data.emisor_id){
                let userTo = {
                    chat_id:data.chat_id,
                        usuario_id:data.usuarioid_receptor,
                            nombre:data.nombre_receptor,
                                        apellido: data.apellido_receptor,
                                            avatar: data.avatar_receptor,
                                                email: data.email_receptor,
                                                    conectado:data.conectado_receptor
    
                }
            setUserTo(userTo);
        }else{
                let userTo = {
                    chat_id:data.chat_id,
                        usuario_id:data.usuarioid_emisor,
                            nombre:data.nombre_emisor,
                                apellido: data.apellido_emisor,
                                    avatar: data.avatar_emisor,
                                        email: data.email_emisor,
                                            conectado:data.conectado_emisor
                }
    
            setUserTo(userTo);          
        }
    }
    
    const handleOpenChat = async (chat) => {
        let user = {}
        let chat_id = chat.chat_id;
        //para que se vaya cargando loading
        dispatch(openChat({chat_id:chat_id, open:true, emisor_id:''}));
        await axios.get(API.urlApi+'getMessage/'+chat_id, headers).then(response => {
            const data =  response.data.result[0];
            if(estado.auth.userAuth.usuario_id === data.emisor_id)
            {
                user = {
                    chat_id:data.chat_id,
                        usuario_id:data.usuarioid_receptor,
                            nombre:data.nombre_receptor,
                                apellido: data.apellido_receptor,
                                    avatar: data.avatar_receptor,
                                        email: data.email_receptor,
                                            conectado:data.conectado_receptor
    
                }
            }else
            {
                user = {
                        chat_id:data.chat_id,
                            usuario_id:data.usuarioid_emisor,
                                nombre:data.nombre_emisor,
                                    apellido: data.apellido_emisor,
                                        avatar: data.avatar_emisor,
                                            email: data.email_emisor,
                                                conectado:data.conectado_emisor
                }         
            }

            /**
             * si chatID es diferente  del chat abierto
             * mando a ejecutar el spinnerLoading para cargar 
             * la nueva data.
             */
            if(chatId != chat_id)
            {
                setChatId(chat_id);
                dispatch(loading(false)); 
            }else
            {
                dispatch(loading(true));  
            }
            
            dispatch(openChat({chat_id:chat_id, open:true, emisor_id:user.usuario_id, cargo:chat.cargo, observacion:chat.observacion, nro_contacto:chat.nro_contacto, nombre_solicitante:chat.nombre_solicitante})); //validat emisor_id para usuriocliente
            dispatch(infoUserTo(user));//actualizar stado de userTo del chat redux
            dispatch(getConversation(response.data.result));//actualizar stado de conversation redux

        }).catch(error =>{
            console.log(error);
        });
    }

    const preRender = () => {
        return (<>
            <div>
                        <div className="px-4 pt-4">
                            <h4 className="mb-4">Chats</h4>
                            <div className="search-box chat-search-box">
                                <div className="input-group mb-3 bg-light  input-group-lg rounded-lg">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-link text-muted pr-1 text-decoration-none" type="button">
                                            <i className="ri-search-line search-icon font-size-18"></i>
                                        </button>
                                    </div>
                                    <input type="text" className="form-control bg-light" placeholder="Search messages or users" />
                                </div> 
                            </div> {/* Search Box*/}
                        </div> {/* .p-4 */}
    
                        {/* Start user status */}
                        <div className="px-4 pb-4" dir="ltr">
                            {/* end user status carousel */}
                        </div>
                        {/* end user status */}
    
                        {/* Start chat-message-list */}
                        <div className="px-2">
                            <h5 className="mb-3 px-3 font-size-16">Chats recientes </h5>
                            <div className="chat-message-list" data-simplebar>
                                <ul className="list-unstyled chat-list chat-user-list">
                                    {estado.chat.getChatsUser.length > 0 ?
                                        Object.values(estado.chat.getChatsUser).map((value, key) => {
                                            return (
                                                <li key={key} className="unread">
                                                    <a href="/#" onClick={()=>{handleOpenChat(value)}} >
                                                        <div className="media">{/* away online offline */}
                                                            <div className={value.conectado > 0 ? "chat-user-img online align-self-center mr-3" : "chat-user-img offline align-self-center mr-3"} >
                                                                <img src={value.avatar !== '' ? value.avatar : IMG } className="rounded-circle avatar-xs" alt=""/>
                                                                <span className="user-status"></span>
                                                            </div>
                                                            <div className="media-body overflow-hidden">
                                                                <h5 className="text-truncate font-size-15 mb-1">{value.observacion}</h5>
                                                                <p className="chat-user-message text-truncate mb-0">
                                                                <i className="fa fa-clone" aria-hidden="true"></i> Radicado N# {value.chat_id}
                                                                </p>
                                                            </div>
                                                            <div className="font-size-11"> {TIMERMESSAGE(value.fecha_order)}</div>
    
                                                            <div className="unread-message">
                                                                {value.num_mensajes > 0 &&
                                                                    <span className="badge badge-soft-danger badge-pill">{value.num_mensajes}</span>
                                                                }                                                            
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            )
                                        }) :
                                        <li>No, hay chats</li>                                
                                    }
                                </ul>
                            </div>
    
                        </div>
                        {/* End chat-message-list */}
            </div>
        </>);
    }

    return (preRender());
}

export default ChatOpenUser;