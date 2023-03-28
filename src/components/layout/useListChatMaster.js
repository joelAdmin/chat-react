import React, {useState, useEffect} from "react";
//import axios from "axios";
import {IMG, TIMERMESSAGE} from '../lib/Lib';
import {getChatsM, getSubChats} from '../helpers/Chat';
import {getConversations} from '../helpers/Conversations';
import {random} from '../lib/Lib';
import {SpinnerLoadingMinColor as SpinnerLoadColor} from '../helpers/SpinnerLoading';

import {useSelector, useDispatch} from 'react-redux';
import {loading, openChat, getChatsMaster, getSubChatsMaster, getCollapseChat} from '../../features/user/chatSlice';
import {infoUserTo} from '../../features/user/userToSlice'
import {getConversation} from '../../features/user/conversationSlice';

import axios from "axios";
import Cookies from 'universal-cookie';
import $, { contains } from 'jquery';

export default function useListChatMaster(props){
   
    const [chatId, setChatId] = useState(0);  
    const [emisorId, setEmisorId] = useState(0);
    const [loadSubChat, setloadSubChat] = useState(false);

    const dispatch = useDispatch();
    const estado = useSelector((state) => state);

    const cookies = new Cookies();

    //validamos si es el mismo emisor
    const loadSubMenu = (emisor_id) => {
        if((emisorId !== emisor_id) && (emisor_id != null))
        {
            setEmisorId(emisor_id);
            setloadSubChat(false);
        }else
        {
            setloadSubChat(true);
        }
    }

    const setReduxStateCollapse = (emisor_id) => {
        dispatch(getCollapseChat({
            status:true,
            emisorId:emisor_id
        }));
       
        if ($("#collapseExample_"+emisor_id).hasClass("show")) {
            // La clase miClase está definida en el div
            console.log('La clase show está definida en el div');
            dispatch(getCollapseChat({}));
        } else {
            // La clase miClase no está definida en el div
            if(Object.entries(estado.chat.getCollapseChat).length > 0)
            {
                console.log('La clase show está definida en CHAT  DIFERENTE en el div');
            }else{
                console.log('1ER La clase show no está definida en el div');
            }           
        }
    }
    
    const subChat = (emisor_id) => {
        //setReduxStateCollapse(emisor_id);
        loadSubMenu(emisor_id);        
        getSubChats(emisor_id).then((response)=>{
			dispatch(getSubChatsMaster(response.result));
            setloadSubChat(true);
		}).catch((error)=>{
			console.log(error);
		});
    }

    useEffect(() => {
      console.log('Cargando submenu');
    }, []);
    
    const handleOpenChat = (chat_id) => { 
        console.log('Abriendo sub chat ....');
        //para que se vaya cargando loading
        dispatch(openChat({chat_id:chat_id, open:true, emisor_id:''}));
        console.log(estado);
        let user = {}
        getConversations(chat_id).then((response) => { 
            const data =  response.result[0];
            if(estado.auth.userAuth.usuario_id  === data.emisor_id){
                user = {
                    chat_id:data.chat_id,
                        usuario_id:data.usuarioid_receptor,
                            nombre:data.nombre_receptor,
                                    apellido: data.apellido_receptor,
                                        avatar: data.avatar_receptor,
                                            email: data.email_receptor,
                                                conectado:data.conectado_receptor
    
                }
            }else{
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
            
            dispatch(openChat({chat_id:chat_id, open:true, emisor_id:user.usuario_id})); //validat emisor_id para usuriocliente
            dispatch(infoUserTo(user));//actualizar stado de userTo del chat redux
            dispatch(getConversation(response.result));//actualizar stado de conversation redux

            props.callbackOpenChat({chat_id:chat_id, open:true, user:user, emisor_id:user.usuario_id, conversation:response.result})
        }).catch((error) => {
            console.log(error);
        });
    }

    return (<div id="accordion">
        {estado.chat.getChatsMaster.length > 0 ?
            Object.values(estado.chat.getChatsMaster).map((value, key) => {
                return (
                    <li key={random + key} className="unread">
                        <a href={'#collapseExample_'+value.emisor_id} data-toggle="collapse" onClick={()=>{subChat(value.emisor_id)}}  role="button" aria-expanded="false" aria-controls={'collapseExample_'+value.chat_id}  >
                            <div className="media">{/* away online offline */}
                                <div className={value.conectado > 0 ? "chat-user-img online align-self-center mr-3" : "chat-user-img offline align-self-center mr-3"} >
                                    <img src={value.avatar !== '' ? value.avatar : IMG } className="rounded-circle avatar-xs" alt=""/>
                                    <span className="user-status"></span>
                                </div>
                                <div className="media-body overflow-hidden">
                                    <h5 className="text-truncate font-size-15 mb-1">{value.nombres}</h5>
                                    <p className="chat-user-message text-truncate mb-0">
                                    <i className="fa fa-clone" aria-hidden="true"></i> Emisor:{value.emisor_id} Radicado {value.emisor_id} N# {value.chat_id}
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
                        <div className="filterColllapse collapse" data-emisor={value.emisor_id} id={'collapseExample_'+value.emisor_id} data-parent="#accordion">
                            <div className="card card-body">
                                <ol className="list-unstyled">
                                    {loadSubChat?
                                        Object.values(estado.chat.getSubChatsMaster).map((subchatmaster, key2) => {
                                            return (
                                                    <li key={random + key2} className="unread border p-1">
                                                        <a href="/#" onClick={()=>{handleOpenChat(subchatmaster.chat_id)}} className="p-1">
                                                            <div className="media">
                                                                <div className="chat-user-img align-self-center mr-3">
                                                                    <span className="badge badge-pill ml-3 z-index-2 position-absolute text-default bg-danger text-white ">{(subchatmaster.num_mensajes > 0)?subchatmaster.num_mensajes:''}</span><i className="fa fa-envelope fa-2x"></i> 
                                                                </div>
                                                                <div className="media-body overflow-hidden">
                                                                    <h5 className="text-truncate font-size-15 mb-1">{subchatmaster.observacion}</h5>                                                                    
                                                                    <p className="chat-user-message text-truncate mb-0"><i className="fa fa-folder"></i> {subchatmaster.chat_id}</p>
                                                                </div>
                                                                <div className="font-size-11" id="minu">...</div>                                                                
                                                            </div>
                                                        </a>                                                        
                                                    </li>                                                    
                                                    )
                                        }):
                                        <li key={random} >
                                             <SpinnerLoadColor color="loading-spinner-bgWhite-default-25" />
                                        </li>
                                    }
                                </ol>
                            </div>
                        </div>
                    </li>
                )
            }) :
            <li key={random}>
                <SpinnerLoadColor color="loading-spinner-default-25" />
            </li>                                
        }
    </div>);
}
