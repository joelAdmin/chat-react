import React, {Component} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import getuserAuth from './helpers/UserAuth';
import getConversations from './helpers/Conversations';
import getChatsU from './helpers/ChatsU';
import getChatsM from './helpers/ChatsM';
import {ECHO, API, headers} from './lib/Lib';
import axios from 'axios';
import $ from 'jquery';


class Base extends Component
{
	constructor(props){
		super(props);			
		this.state = {
			userAuth:[],
			access:'',
			conversations: [],
			userTo:{}, 
			openchat:false,
			openchat_id:0,
			chatopen:{
				open:false,
				chat_id:0,
				emisor_id:0,
				receptor_id:0
			}, 
			getChatsU:[],
			getChatsM:[]
		}
	}

	componentDidMount() {
		this.userAuth();
	}

	componentDidUpdate(){
	}

	chatsU =()=>{
		//console.log('Actualizando conversation controlador user', this.state.userAuth.usuario_id) ; 
        getChatsU(this.state.userAuth.usuario_id).then(response=>{
			console.log('Actualizando conversation controlador', response.result); 
            this.setState({getChatsU:response.result});  
        });
    }

	chatsM =()=>{
		console.log('Actualizando chat Master', this.state.userAuth.usuario_id); 
		getChatsM().then((response)=>{
			this.setState({getChatsM:response.result}); 
			console.log('Actualizado chat Master', this.state.getChatsM); 
        }).catch((error)=>{
            console.log('error',error);
        });
	}

	config =()=>{
		ECHO.private(`new-message.${this.state.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
			/**
			 * varificar si hay chat o coversaciones abiertas ---> si las hay solo atualizo las conversaciones
			 * sino solo actualizo la lista de mensaje sin leer
			 */
			console.log('channel new message', data);
			if(this.state.chatopen.open === true && parseInt(data.chat_id) === parseInt(this.state.chatopen.chat_id)){
				axios.get(API.urlApi+'getMessage/'+data.chat_id, headers).then(response =>{
					console.log('Actualizando conversation', response.data.result) ; 
					this.conversationsCallback(response.data.result, data.user_emisor);
				}).catch(error =>{
					console.log(error);
				});
			}else{
				if(this.state.access === 'Mg=='){
					console.log('ACTUALIZAR LISTA DE CHAT USER ....');
					this.chatsU();
				}else{
					console.log('FALTO EL ACTUALIZAR SUBCHAT CON MENSAJE NUEVO....');
					this.chatsM();
				}
			}
		});
	}

	userAuth = () =>{
		getuserAuth().then(response => {
			this.setState({userAuth:response.result, access:response.access});
			this.config();
			console.log('this.props.access ', this.state.access );
			if(this.state.access === 'Mg=='){
				console.log('Usuario');
				this.chatsU();
			}else{
				console.log('Master');
				this.chatsM();
			}			
		});		   
	}

	/**** number */
	/*
	updateListChatCallback =(valor)=>{
		this.setState({
			updateListChat:valor
		})
	}*/

	conversationsCallback = (getconversations, getuserto) => {
		this.setState({conversations:getconversations, userTo:getuserto})
		if(this.state.access === 'Mg=='){
			console.log('ACTUALIZAR LISTA DE CHAT NO LEIDOS USER ....');
			this.chatsU();
		}
	}

	openchatCallback = (data, chat_id) =>{
		this.setState({
			chatopen:{
				open:data,
				chat_id:chat_id,
				emisor_id:this.state.userAuth.usuario_id,
				receptor_id:0,
			}
		});
		console.log('ABRIENDO CHAT', this.state.chatopen);
	}

	modifyMessage= (data) => {
		this.setState({message: data})
	}

	sidebarMenu=()=>{		
		if(this.state.userAuth !== ''){
			return (<SidebarMenu callbackCloseEmjoi={this.callbackCloseEmjoi} auth={this.state.userAuth} ></SidebarMenu>); 
		}   	
	}
	
	chatLeftSidebar=()=>{
		return (<ChatLeftSidebar callbackCloseEmjoi={this.callbackCloseEmjoi} getChatsM={this.state.getChatsM} getChatsU={this.state.getChatsU} auth={this.state.userAuth} access={this.state.access} openchatCallback={this.openchatCallback}  conversationsCallback={this.conversationsCallback}></ChatLeftSidebar>);
	}
	
	conversation=()=>{
		return (<Conversation callbackCloseEmjoi={this.callbackCloseEmjoi} parent={this.state}  conversations={this.state.conversations} userTo={this.state.userTo}></Conversation>);
	}

	callbackCloseEmjoi = () =>{
		if($('#contentEmoji').css('display')!= 'none'){           
            $('#contentEmoji').hide(200);
        }
	}

	render(){
		return (
			<div className="layout-wrapper d-lg-flex" >				
				{this.sidebarMenu()}				
				{this.chatLeftSidebar()}
				{this.conversation()}
			</div>
		);
	}
}

export default Base;