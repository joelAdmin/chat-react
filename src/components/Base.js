import React, {useEffect, useState} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import {getuserAuth as getApiUserAuth} from './helpers/UserAuth';
import {getChatsU as getApiChatsU, getChatsM as getApiChatsM} from './helpers/Chat';
import {ECHO, API, headers} from './lib/Lib';
import axios from 'axios';
import $ from 'jquery';
import {getSubChats} from './helpers/Chat';

import {useSelector, useDispatch} from 'react-redux';
import {setLogin} from '../features/user/authSlice';
import {openChat, getChatsUser, getChatsMaster, getSubChatsMaster} from '../features/user/chatSlice';
import {getConversation} from '../features/user/conversationSlice';
import {infoUserTo} from '../features/user/userToSlice';

const Base = () => {

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const estado = useSelector((state) => state);
	const chat = useSelector((state) => state.chat.openChat);
	const getChatsMasterState = useSelector((state) => state.chat.getChatsMaster);

	const [openchat, setOpenchat] = useState(false);
	const [openchat_id, setOpenchat_id] = useState(0);
	const [getChatsM, setGetChatsM] = useState({});//pasar a global con redux
	const [getChatsU, setGetChatsU] = useState({});//pasar a global con redux
	const [conversations, setConversations] = useState({});//pasar a global con redux
	const [userTo, setUserTo] = useState();//pasar a global con redux
	const [access, setAccess] = useState('');//pasar a global con redux
	const [message, setMessage] = useState('');//pasar a global con redux
	const [chatopen, setChatopen]   = useState({
		open:false,
		chat_id:0,
		emisor_id:0,
		receptor_id:0
	});//pasar a global con redux

	useEffect(() => {
		console.log('Load 1:'+estado.chat.openChat);
		console.log(estado.chat.openChat);
		//userAuth();	
		
		config();	
	}, [user.userAuth.usuario_id]);	

	useEffect(() => {
		console.log('Load 2:'+estado.chat.openChat);
		console.log(estado.chat.openChat);
		userAuth();	
		//config();	
	}, [user]);	

	const modifyMessage= (data) => {
		setMessage(data);
	}

	const conversationsCallback = (getconversations, getuserto) => {
		dispatch(getConversation(getconversations));
		dispatch(infoUserTo(getuserto));
		if(estado.auth.access === 'Mg=='){
			chatsU();
		}
	}

	const config = () => {
		console.log('ECHO');
		console.log(estado.chat.openChat);
		ECHO.private(`new-message.${user.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
			console.log('nuevo mensaje');
			
			console.log(chat);
			/**
			 * varificar si hay chat o coversaciones abiertas ---> si las hay solo actualizo las conversaciones
			 * sino solo actualizo la lista de mensaje sin leer
			 */
			/*console.log('chatopen.open:'+chatopen.open);
			console.log('data.chat_id:'+data.chat_id);
			console.log('chatopen.chat_id:'+chatopen.chat_id);*/
			if(chat.open === true && parseInt(data.chat_id) === parseInt(chat.chat_id)){
				console.log('chat abierto');
				axios.get(API.urlApi+'getMessage/'+data.chat_id, headers).then(response =>{
					conversationsCallback(response.data.result, data.user_emisor);
				}).catch(error =>{
					console.log(error);
				});
			}else{
				console.log('chat cerrado');
				userAuth();
				/*if(estado.auth.access === 'Mg=='){
					//console.log('ACTUALIZAR LISTA DE CHAT USER ....');
					chatsU();
				}else{
					//console.log('FALTO EL ACTUALIZAR SUBCHAT CON MENSAJE NUEVO....');
					chatsM();
				}*/
			}
		});
	}


	const userAuth = () => {	
		if((estado.auth.access == 'Mg==') && (estado.auth.access != '')){
			console.log('chat usuario');
			chatsU();
		}else if((estado.auth.access == 'MA==') && (estado.auth.access != '')){
			console.log('chat manager');
			chatsM();
		}	
	}


	const chatsU = () => {
        getApiChatsU(user.userAuth.usuario_id).then(response => {
			setGetChatsU(response.result);
			dispatch(getChatsUser(response.result));
        });
    }

	const chatsM = () => {
		getApiChatsM().then((response) => {
			dispatch(getChatsMaster(response.result));
        }).catch((error)=>{
            console.log('error',error);
        });
	}

	const conversation = () => {

		const parent = {
			chatopen:estado.chat.openChat, 
			userTo:estado.userTo.infoUserTo,
			getChatsM:estado.chat.getChatsMaster,
			getChatsU:estado.chat.getChatsUser,
			userAuth:user.userAuth,
			openchat:openchat
		}

		return (<Conversation 
					callbackCloseEmjoi={callbackCloseEmjoi} 
						parent={parent}  
							conversations={estado.conversation.getConversation} 
								userTo={estado.userTo.infoUserTo}/>);
	}

	const chatLeftSidebar = () => {
		return (<ChatLeftSidebar 
					callbackCloseEmjoi={callbackCloseEmjoi()} 						
							getChatsU={getChatsU} 
								auth={user.userAuth} 
									access={user.access} />);
	}


	/**
	 * función encargada de  alterar estilo css mediante clases
	 * puede ser implementada mediante eventos js como onclick
	 */
	const callbackCloseEmjoi = () =>{
		if($('#contentEmoji').css('display')!= 'none'){           
            $('#contentEmoji').hide(200);
        }
	}


	/***
	 * funcion encargada de retornar el menu de opciones vertical izquierdo
	 * mediante el componente <SidebarMenu /> en el cual se pasan dos props
	 * callbackCloseEmjoi y auth
	 */
	const sidebarMenu = () => {		
		if(user.userAuth !== ''){
			return (<SidebarMenu callbackCloseEmjoi={callbackCloseEmjoi()} auth={user.userAuth} />); 
		}   	
	}

	return (
		<div className="layout-wrapper d-lg-flex" >				
			{sidebarMenu()}				
			{chatLeftSidebar()}
			{conversation()}
		</div>
	);
}

export default Base;