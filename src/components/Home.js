import React, {useEffect, useState} from 'react';
import { useNavigate, Navigate, useLocation} from "react-router-dom";
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import {getuserAuth as getApiUserAuth} from './helpers/UserAuth';
import {getChatsU as getApiChatsU, getChatsM as getApiChatsM} from './helpers/Chat';
import {ECHO, API, headers, isAuth, isNotAuth} from './lib/Lib';
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
	const chatOpen = useSelector((state) => state.chat.openChat);
	const getChatsMasterState = useSelector((state) => state.chat.getChatsMaster);

	const [openchat, setOpenchat] = useState(false);
	const [openchat_id, setOpenchat_id] = useState(0);
	const [getChatsM, setGetChatsM] = useState({});//pasar a global con redux
	const [getChatsU, setGetChatsU] = useState({});//pasar a global con redux
	const [conversations, setConversations] = useState({});//pasar a global con redux
	const [userTo, setUserTo] = useState();//pasar a global con redux
	const [access, setAccess] = useState('');//pasar a global con redux
	const [message, setMessage] = useState(false);//pasar a global con redux
	//const [chats, setChats] = useState([]);
	//const [userAuth, setUserAuth] = useState({});
	const [chatopen, setChatopen]   = useState({
		open:false,
		chat_id:0,
		emisor_id:0,
		receptor_id:0
	});
	//pasar a global con redux    

    //const [userAcess, setUserAcess] = useState(estado.auth.access);
    useEffect(() => { 
		/*console.log('location');
		console.log(location.state);
		console.log('Estado:');
		console.log(estado);*/
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
		console.log('Abriendo chat ......');
		//console.log(user);	
		//console.log(chat.openChat);		
		echoNewMessageInput(user, chat.openChat);	
	},[chat.openChat]);	


	useEffect(() => {
		if(Object.entries(chat.getSubChatsMaster).length > 0)
		{
			console.log('Abriendo nivel superior chat master ......');
			console.log(chat.getSubChatsMaster[0].emisor_id);
			//setStateReduxByAPIGetSubChat(chat.getSubChatsMaster[0].emisor_id);
		}
	},[chat.getSubChatsMaster]);


	useEffect(() => {
		console.log('Actualizando conversation');	
		topScroll();
	},[estado.conversation.getConversation]);	

	/*
		useEffect(() => {
			//console.log('user:'+user.access.length);	
			console.log('Ejecuntando ......');			
			if(user.access.length > 0)
			{
				console.log('usuario en sesion');

				if(Object.entries(chat.openChat).length === 0) 
				{
					console.log('Todos estan cerrados');
					//setStateReduxByAPIGetChatsMaster();
							
				}else if(Object.entries(chat.openChat).length > 0)
				{				
					console.log('Hay almenos un chat abierto');
					
				}

			}		
		},[user, chat.openChat]);	
	*/


	const echoNewMessageInputNull = () => {
		//console.log('ECHO'+user.userAuth.usuario_id);
		//console.log(estado.chat.openChat);
		//console.log(user);
		//console.log(openChat);
		
		ECHO.private(`new-message.${user.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
			console.log('nuevo mensaje');
			console.log(chat);
			setMessage(true);
			if(Object.entries(chat.openChat).length == 0){
				console.log('null');
			}

			/*
			if(Object.entries(chat.openChat).length > 0) 
			{
				console.log('Hay almenos un chat abierto');
			}else if(Object.entries(chat.openChat).length === 0)
			{
				console.log('Todos estan cerrados');
			}/
			//console.log(estado);
			/**
			 * varificar si hay chat o coversaciones abiertas ---> si las hay solo actualizo las conversaciones
			 * sino solo actualizo la lista de mensaje sin leer
			 */
			/*console.log('chatopen.open:'+chatopen.open);
			console.log('data.chat_id:'+data.chat_id);
			console.log('chatopen.chat_id:'+chatopen.chat_id);*/
			/*
			if(chatOpen.open === true && parseInt(data.chat_id) === parseInt(chatOpen.chat_id)){
				//console.log('chat abierto');
				axios.get(API.urlApi+'getMessage/'+data.chat_id, headers).then(response =>{
					conversationsCallback(response.data.result, data.user_emisor);
				}).catch(error =>{
					console.log(error);
				});
			}else{
				console.log('chat cerrado');
				//userAuth();
				if(estado.auth.access === 'Mg=='){
					//console.log('ACTUALIZAR LISTA DE CHAT USER ....');
					chatsU();
				}else{
					//console.log('FALTO EL ACTUALIZAR SUBCHAT CON MENSAJE NUEVO....');
					chatsM();
				}
			}
			*/
		});
	}

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

	const echoNewMessageInput = (auth, openChat) => {
		if(auth.access.length > 0)
		{
			//console.log('user auth');
			//console.log(auth);
			//console.log('echoNewMessageInput chat_id:'+Object.entries(chat).length);
			ECHO.private(`new-message.${auth.userAuth.usuario_id}`).listen('.NewMessage', (data) => {
				console.log('ECHO nuevo mensaje open chat_id:'+Object.entries(openChat).length);
				console.log(data);
				//console.log('mensaje recibido de chat_id:'+data.chat_id);
				setMessage(true);
				if(Object.entries(openChat).length > 0)
				{
					if((openChat.open == true) && (parseInt(data.chat_id) == parseInt(openChat.chat_id)))
					{
						console.log('conversacion abierta con el mismo chat y recibiendo ...');	
						setStateReduxByAPIGetConversation(data.chat_id, data.emisor_id, auth);											
					}else
					{
						console.log('conversacion abierta con DIFERENTE <> CHAT y recibiendo ...');
						//console.log(chat.getSubChatsMaster[0].emisor_id);	
					}
				}else if(Object.entries(openChat).length === 0)
				{
					console.log('conversacion cerrada y recibiendo ...');
					setStateReduxByAPIGetChats(auth);
					//setStateReduxByAPIGetSubChat(auth.userAuth.usuario_id);
				}				
			});
		}
	}

	const echoNewMessageInput_ = (user, openChat) => {
		if(user.access.length > 0)
		{
			console.log('user__');
			console.log(user);
			console.log('echoNewMessageInput chat_id:'+Object.entries(chat).length);
			ECHO.private(`new-message.${user.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
				console.log('____nuevo mensaje open chat_id:'+Object.entries(openChat).length);
				console.log(openChat);
				console.log('____mensaje recibido de chat_id:'+data.chat_id);
				setMessage(true);
				if(Object.entries(openChat).length > 0)
				{
					if((openChat.open == true) && (parseInt(data.chat_id) == parseInt(openChat.chat_id)))
					{
						console.log('conversacion abierta con el mismo chat y recibiendo ...');							
						//consulta(data.chat_id, data.user_emisor);						
					}else
					{
						console.log('conversacion abierta con DIFERENTE <> CHAT y recibiendo ...');	
					}
				}else if(Object.entries(openChat).length === 0)
				{
					console.log('conversacion cerrada y recibiendo ...');
				}
			});
		}
		//ECHO.disconnect();
	}


	const setStateReduxByAPIGetConversation = (chat_id, user_emisor, auth) => {
		if(auth.access == 'Mg==')
		{
			console.log('usuario conversation api');
		}else if(auth.access == 'MA==') {
			axios.get(process.env.REACT_APP_URL_API+'getMessage/'+chat_id, headers).then(response => {
				console.log('recibiendo conversation de api');				
				dispatch(getConversation(response.data.result));
				topScroll();
				//dispatch(infoUserTo(getuserto));
				//conversationsCallback(response.data.result, user_emisor);
				
			}).catch(error =>{
				console.log(error);
			});
		}
	}

	const setStateReduxByAPIGetChats = (auth) => {
		if(auth.access == 'Mg==')
		{
			console.log('usuario chats api');
		}else if(auth.access == 'MA==') {
			axios.get(process.env.REACT_APP_URL_API+'chatsAuthM/'+auth.userAuth.usuario_id, headers).then(response => {  
				console.log(response);
				dispatch(getChatsMaster(response.data.result));
			}).catch(function (error) {
				console.log(error);
			});
		}
	}

	const setStateReduxByAPIGetSubChat = (emisor_id) => {
        axios.get(process.env.REACT_APP_URL_API+'subChatAuthM/'+emisor_id, headers).then(response => {
            if(response.data.res)
            { 
				console.log('recibiendo subcat de api');
				console.log(response);
                dispatch(getSubChatsMaster(response.data.result));
            }
        }).catch(error => {
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

	/*useEffect(()=>{
		if(isAuth == false)
		{
			return navigate('/login');
		}
	});*/

    /*
	useEffect(() => {
		console.log('useEffect 1');
		
		//console.log('Load 1:'+estado.chat.openChat);
		//console.log(estado.chat.openChat);
		//userAuth();
		if(typeof user.userAuth.usuario_id !== 'undefined'){
			//config();
			console.log(estado.chat.openChat);
			ECHO.private(`new-message.${estado.auth.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
				console.log('ECHO nuevo mensaje');console.log(estado);
				alert('nuevo mensaje');
				//console.log(openChats);
			}); 	
		}	
			
	}, [user.userAuth.usuario_id]);	
    */

    /*
	useEffect(() => {
		console.log('useEffect 2.2');
		//console.log('Load 2:'+estado.chat.openChat);
		//console.log(estado.chat.openChat);
		userAuth();	
		//config();	
	}, [user]);	*/

    /*
	useEffect(()=>{
		//props.addStoreInfoUser()
        console.log('useEffect 3');
        console.log(estado);
        if(Object.entries(estado.auth.userAuth).length > 0 ){ 
			console.log(estado);					          
        }
    }, [estado.chat.openChat.chat_id]);
    */

	const conversationsCallback = (getconversations, getuserto) => {
		dispatch(getConversation(getconversations));
		dispatch(infoUserTo(getuserto));
	}

    /*
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
	*/

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
			//console.log('userAuth');
			//console.log(user.userAuth);
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