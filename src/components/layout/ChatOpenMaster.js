import React, {useEffect, useState} from "react";
//import axios from "axios";
//import {API, IMG, TIMERMESSAGE, headers} from '../lib/Lib';
import ListChatMaster from './useListChatMaster.js';
import {useSelector, useDispatch} from 'react-redux';

import {ECHO, API, headers} from '../lib/Lib';

import {loading, openChat, getChatsMaster, getSubChatsMaster} from '../../features/user/chatSlice';
import {infoUserTo} from '../../features/user/userToSlice'
import {getConversation} from '../../features/user/conversationSlice';


const ChatOpenMaster = (props) => {    
    const estado = useSelector((state) => state);
    const user = useSelector((state) => state.auth);
    const [newMessageDiffchat, setNewMessageDiffchat] = useState(false);
    const [openChats, setOpenChats] = useState({});
    const dispatch = useDispatch();

    /*useEffect(()=>{
        console.log('ChatOpenMaster1');
        //console.log(Object.entries(estado.auth.userAuth).length);
        //console.log(user);
        if(Object.entries(estado.auth.userAuth).length > 0 ){
            console.log(Object.entries(estado.auth.userAuth).length);
            echoNewMessage();
        }
       
    }, [estado.auth.userAuth]);

    useEffect(()=>{
        console.log('ChatOpenMaster2');
        
        //console.log(user);
        if(Object.entries(estado.chat.openChat).length > 0 ){
            console.log(Object.entries(estado.chat.openChat).length);
            echoNewMessage();
        }
       
    },[estado.chat.openChat]);*/

    useEffect(()=>{
        //console.log('ChatOpenMaster3Inicio');        
        //console.log(user);
        if(Object.entries(estado.auth.userAuth).length > 0 )
        { 
            //console.log('estado.auth.userAuth');          
            /*if(Object.entries(estado.chat.openChat).length > 0 ){
                console.log('(estado.chat.openChat');
                console.log(Object.entries(estado.auth.userAuth).length);
                echoNewMessage();
            }else{
                echoNewMessageChatClose()
            }*/

            //echoNewMessage();
        }
       
    },[newMessageDiffchat]);

    useEffect(()=>{
       /* console.log('useEfect 2');
        console.log(estado);

        if(Object.entries(estado.auth.userAuth).length > 0 )
        { 
           console.log('existe auth en useEfect 2');
           //echoNewMessage();
            
        }*/
    }, [estado.chat.openChat.chat_id]);

    const echoNewMessageChatClose = () => {
        console.log('!!chat cerrado nuevo mensaje');
    }
    const echoNewMessage = () => {
		//console.log('ECHO'+user.userAuth.usuario_id);
        console.log('echoNewMessage entro');
		console.log(estado);
		console.log(openChats);
        //console.log(Object.entries(estado.auth.userAuth).length)
        
	}

    const echoNewMessage2 = () => {
		//console.log('ECHO'+user.userAuth.usuario_id);
		console.log(estado);
        //console.log(Object.entries(estado.auth.userAuth).length);
        ECHO.private(`new-message.${estado.auth.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
                console.log('ECHO nuevo mensaje..');
                //setMessage(true);
                //console.log(estado);
                /**
                 * varificar si hay chat o coversaciones abiertas ---> si las hay solo actualizo las conversaciones
                 * sino solo actualizo la lista de mensaje sin leer
                 */
                /*console.log('chatopen.open:'+chatopen.open);
                console.log('data.chat_id:'+data.chat_id);
                console.log('chatopen.chat_id:'+chatopen.chat_id);*/
                //if(Object.entries(estado.chat.openChat).length > 0){
                    if(estado.chat.openChat.open === true && parseInt(data.chat_id) === parseInt(estado.chat.openChat.chat_id)){
                        console.log('chat abierto nuevo mensaje');
                        /*axios.get(API.urlApi+'getMessage/'+data.chat_id, headers).then(response =>{
                            conversationsCallback(response.data.result, data.user_emisor);
                        }).catch(error =>{
                            console.log(error);
                        });*/
                    }else if(estado.chat.openChat.open === true && parseInt(data.chat_id) !== parseInt(estado.chat.openChat.chat_id)){
                        console.log('chat abierto nuevo mensaje en chat diferente');
                        //userAuth();
                        /*if(estado.auth.access === 'Mg=='){
                            //console.log('ACTUALIZAR LISTA DE CHAT USER ....');
                            chatsU();
                        }else{
                            //console.log('FALTO EL ACTUALIZAR SUBCHAT CON MENSAJE NUEVO....');
                            chatsM();
                        }*/
                    }else if(Object.entries(estado.chat.openChat).length === 0){
                        console.log('chat cerrado nuevo mensaje');
                        console.log(estado.chat.openChat);
                    }
                //}
        });
        
	}

    const callbackOpenChat = (obj) => {
        //console.log('actualizando callbackOpenChat');
        //console.log(obj);
        setNewMessageDiffchat(true);
        //dispatch(openChat({chat_id:obj.chat_id, open:true, emisor_id:obj.emisor_id})); //validat emisor_id para usuriocliente
        setOpenChats({chat_id:obj.chat_id, open:true, emisor_id:obj.emisor_id});
        //dispatch(infoUserTo(obj.user));//actualizar stado de userTo del chat redux
        //dispatch(getConversation(obj.conversation));//actualizar stado de conversation redux.
        //console.log('get estado');
        //console.log(estado);

        //console.log('setOpenChat');
        //console.log(openChats);
    }

    return (<div>
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
                        <h5 className="mb-3 px-3 font-size-16">Recientes MASTER</h5>
                        <div className="chat-message-list" data-simplebar>
                            <ul className="list-unstyled chat-list chat-user-list">
                               <ListChatMaster callbackOpenChat={callbackOpenChat} auth={props.auth} {...props} />
                            </ul>
                        </div>

                    </div>
                    {/* End chat-message-list */}
            </div>);
}

export default ChatOpenMaster;