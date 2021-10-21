import React, {Component} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import getuserAuth from './helpers/UserAuth';
import getConversations from './helpers/Conversations';
import {ECHO, API, headers} from './lib/Lib';
import axios from 'axios';


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
			}
		}
	}

	componentDidMount() {
		this.userAuth();
	}

	componentDidUpdate(){
		//this.userAuth();
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
			}
		});
	}

	userAuth = () =>{
		getuserAuth().then(response => {
			this.setState({userAuth:response.result, access:response.access});
			this.config();
		});		   
	}

	/**** number */
	conversationsCallback = (getconversations, getuserto) => {
		this.setState({conversations:getconversations, userTo:getuserto})
	}

	openchatCallback = (data, chat_id) =>{
		this.setState({
			chatopen:{
				open:data,
				chat_id:chat_id,
				emisor_id:this.state.userAuth.usuario_id,
				receptor_id:0,
			}
		})
	}

	modifyMessage= (data) => {
		this.setState({message: data})
	}

	sidebarMenu=()=>{		
		if(this.state.userAuth !== ''){
			return (<SidebarMenu auth={this.state.userAuth}></SidebarMenu>); 
		}   	
	}
	
	chatLeftSidebar=()=>{
		return (<ChatLeftSidebar auth={this.state.userAuth} access={this.state.access} openchatCallback={this.openchatCallback}  conversationsCallback={this.conversationsCallback}></ChatLeftSidebar>);
	}
	
	conversation=()=>{
		return (<Conversation parent={this.state}  conversations={this.state.conversations} userTo={this.state.userTo}></Conversation>);
	}


	render(){
		return (
			<div className="layout-wrapper d-lg-flex">				
				{this.sidebarMenu()}				
				{this.chatLeftSidebar()}
				{this.conversation()}
			</div>
		);
	}
}

export default Base;