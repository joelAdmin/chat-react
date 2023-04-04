import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import {getChatsU as getApiChatsU, getChatsM as getApiChatsM} from './helpers/Chat';
import {getConversations} from './helpers/Conversations';
import {ECHO} from './lib/Lib';
import axios from 'axios';
import $, { contains } from 'jquery';
import {getSubChats} from './helpers/Chat';

import {useSelector, useDispatch} from 'react-redux';
import {setLogin} from '../features/user/authSlice';
import {openChat, getChatsUser, getChatsMaster, getSubChatsMaster} from '../features/user/chatSlice';
import {getConversation} from '../features/user/conversationSlice';
import {infoUserTo} from '../features/user/userToSlice';

import Cookies from 'universal-cookie';

const Home = (props) => {
	const cookies = new Cookies();
    const location = useLocation();
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);
	const estado = useSelector((state) => state);
	const chat = useSelector((state) => state.chat);

	const [openchat, setOpenchat] = useState(false);
	const [getChatsU, setGetChatsU] = useState({});//pasar a global con redux
	
    useEffect(() => { 
		//si nohay token de se redirecciona a login
		if(typeof cookies.get('token') == 'undefined')
		{
			return navigate('/login');
		}else if(location.state == null)
		{
			/** cuando actualizamos o recargamos la pagina
			 *  y se perdien la variables de estado 
			 **/
			const getStoreUserAuth = JSON.parse(localStorage.getItem('userAuth'));
			setStateReduxByLocalStoreGetChats(getStoreUserAuth);			
			dispatch(setLogin({
				access:getStoreUserAuth.access,
				userAuth:getStoreUserAuth.userAuth
			}));

			echoNewMessageInput({
				access:getStoreUserAuth.access,
				userAuth:getStoreUserAuth.userAuth
			}, {});
		}else
		{
			/**ingresamos desde formulario de login 
			 * recibimos unas varibles de estado enviadas
			 * con la libreria Router react y actualizamos 
			 * localStore y variables de redux toolkit 
			 */
			dispatch(setLogin({
				access:location.state.access,
				userAuth:location.state.userAuth
			}));
			
			setStateReduxByLocationGetChats();			

			localStorage.setItem('userAuth', JSON.stringify({
				access:location.state.access,
				userAuth:location.state.userAuth
			})); 
			localStorage.setItem('chats', JSON.stringify(location.state.chats));	

			echoNewMessageInput({
				access:location.state.access,
				userAuth:location.state.userAuth
			}, {});		  
		}
    }, []);

	useEffect(() => {	
		echoNewMessageInput(user, chat.openChat);	
	},[chat.openChat]);	

	useEffect(() => {
		topScroll();
	},[estado.conversation.getConversation]);

	const topScroll = (validate) => { 
            
        if(validate){
            if(estado.chat.openChat.open){
                if(estado.conversation.getConversation.length > 0){                    
                    setTimeout(function(){
                        var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                        $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 900 );
                    }, 300);
                }
            }
        }else{
            if(estado.conversation.getConversation.length > 0){
                setTimeout(function(){
                    var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                    $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 900 );
                }, 300);
            }
        }        
    }

	const setSubmenuByChat = (emisor_id) => {
		var dataEmisorId = $(".filterColllapse.show").filter(function() {
			return $(this).data("emisor");
		}).data("emisor");

		if(typeof dataEmisorId != 'undefined')
		{
			if(parseInt(dataEmisorId) === parseInt(emisor_id))
			{
				setStateReduxByAPIGetSubChat(emisor_id);
			}
		}
	}

	const echoNewMessageInput = (auth, openChat) => {
		if(auth.access.length > 0)
		{
			ECHO.private(`new-message.${auth.userAuth.usuario_id}`).listen('.NewMessage', (data) => {
				console.log('ECHO nuevo mensaje open chat_id:'+Object.entries(openChat).length);
				if(Object.entries(openChat).length > 0)
				{
					if((openChat.open == true) && (parseInt(data.chat_id) == parseInt(openChat.chat_id)))
					{
						console.log('conversacion abierta con el mismo chat y recibiendo ...');							
						setStateReduxByAPIGetConversation(data.chat_id, data.emisor_id, auth);										
					}else
					{
						console.log('conversacion abierta con DIFERENTE <> CHAT y recibiendo ...');
					}
				}else if(Object.entries(openChat).length === 0)
				{
					console.log('conversacion cerrada y recibiendo ...');
					setStateReduxByAPIGetChats(auth);
					if(auth.access == 'MA==')
					{
						setSubmenuByChat(data.emisor_id);
					}	
				}				
			});
		}
	}

	const setStateReduxByAPIGetConversation = (chat_id, user_emisor, auth) => {			
		getConversations(chat_id).then((response)=>{
			$('.sendMessage').remove();	
			dispatch(getConversation(response.result));
			topScroll();	
		}).catch((error)=>{
			console.log(error);
		});	
	}

	const setStateReduxByAPIGetChats = (auth) => {
		if(auth.access == 'Mg==')
		{
			getApiChatsU(auth.userAuth.usuario_id).then(response => {
				dispatch(getChatsUser(response.result));
			}).catch((error) => {
				console.log('error',error);
			});
		}else if(auth.access == 'MA==') {
			getApiChatsM(auth.userAuth.usuario_id).then((response) => {
				dispatch(getChatsMaster(response.result));
			}).catch((error)=>{
				console.log('error',error);
			});
		}
	}

	const setStateReduxByAPIGetSubChat = (emisor_id) => {       
		getSubChats(emisor_id).then((response)=>{
			dispatch(getSubChatsMaster(response.result));
		}).catch((error)=>{
			console.log(error);
		});
    }

	const setStateReduxByLocationGetChats = () => {
		if(location.state.access == 'Mg==')
		{
			dispatch(getChatsUser(location.state.chats));
		}else if(location.state.access == 'MA==') {
			dispatch(getChatsMaster(location.state.chats));
		}
	}

	const setStateReduxByLocalStoreGetChats = (getStoreUserAuth) => {
		const getStoreChats = JSON.parse(localStorage.getItem('chats'));
		if(getStoreUserAuth.access == 'Mg==')
		{
			dispatch(getChatsUser(getStoreChats));
		}else if(getStoreUserAuth.access == 'MA==') {
			dispatch(getChatsMaster(getStoreChats));
		}
	}

	const conversationsCallback = (getconversations, getuserto) => {
		dispatch(getConversation(getconversations));
		dispatch(infoUserTo(getuserto));
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

export default Home;