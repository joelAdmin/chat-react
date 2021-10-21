import React, {useState, useEffect} from "react";
//import axios from "axios";
import {IMG, TIMERMESSAGE} from '../lib/Lib';
import getChatsM from '../helpers/ChatsM';
import getSubChats from '../helpers/SubChatsM';
import getConversations from '../helpers/Conversations';
import {random} from '../lib/Lib';

export default function useListChatMaster(props){
    const [chats, setChats] = useState([]);
    const [subchats, setSubchats] = useState([]);
    //const [userTo, setUserTo] = useState({});

    const subChat = (emisor_id)=>{
        getSubChats(emisor_id).then((response)=>{
            setSubchats(response.result);
        }).catch((error)=>{
            console.log('error',error);
        });
    }

    const queryChats =()=>{
        getChatsM().then((response)=>{
            setChats(response.result);
        }).catch((error)=>{
            console.log('error',error);
        });
    }
    /*
    const updateUserTo =(data)=>{ 
        let user = {}
        if(props.auth.usuario_id === data.emisor_id){
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
        setUserTo(user);
    }*/


    const conversation =(chat_id)=>{
        let user = {}
        props.parent.openchatCallback(true, chat_id);
        props.parent.conversationsCallback([]);
        //updateUserTo([]);
        getConversations(chat_id).then((response) => { 
            //console.log('response:', response.result[0]);
            //updateUserTo(response.result[0]);
            const data =  response.result[0];
            if(props.auth.usuario_id === data.emisor_id){
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
            props.parent.conversationsCallback(response.result, user);
        }).catch((error) => {
            console.log(error);
        });
    }

    //useEffect(queryChats, [])
    useEffect(() => {
        queryChats();
        return () => {
            setSubchats({}); //retorno vacio para cuando entre por usuarios 
          };
    }, []);

    return (<div id="accordion">
        {chats.length > 0 ?
            Object.values(chats).map((value, key) => {
                return (
                    <li key={random + key} className="unread">
                        <a href={'#collapseExample_'+value.chat_id} data-toggle="collapse" onClick={()=>{subChat(value.emisor_id)}}  role="button" aria-expanded="false" aria-controls={'collapseExample_'+value.chat_id}  >
                            <div className="media">{/* away online offline */}
                                <div className={value.conectado > 0 ? "chat-user-img online align-self-center mr-3" : "chat-user-img offline align-self-center mr-3"} >
                                    <img src={value.avatar !== '' ? value.avatar : IMG } className="rounded-circle avatar-xs" alt=""/>
                                    <span className="user-status"></span>
                                </div>
                                <div className="media-body overflow-hidden">
                                    <h5 className="text-truncate font-size-15 mb-1">{value.nombres}</h5>
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
                        <div className="collapse" id={'collapseExample_'+value.chat_id} data-parent="#accordion">
                            <div className="card card-body">
                                <ol className="list-unstyled">
                                    {subchats.length > 0 ?
                                        Object.values(subchats).map((subchatmaster, key2) => {
                                            return (
                                                    <li key={random + key2} className="unread border p-1">
                                                        <a href="/#" onClick={()=>{conversation(subchatmaster.chat_id)}} className="p-1">
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
                                        <li key={random} >Cargando ...</li>
                                    }
                                </ol>
                            </div>
                        </div>
                    </li>
                )
            }) :
            <li key={random}>Cargando ...</li>                                
        }
    </div>);
}
