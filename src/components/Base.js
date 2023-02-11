import React, {Component} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import {getuserAuth} from './helpers/UserAuth';
import {getChatsU, getChatsM} from './helpers/Chat';
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
        getChatsU(this.state.userAuth.usuario_id).then(response=>{
            this.setState({getChatsU:response.result});  
        });
    }

	chatsM =()=>{
		getChatsM().then((response)=>{
			this.setState({getChatsM:response.result}); 
        }).catch((error)=>{
            console.log('error',error);
        });
	}

	config =()=>{
		ECHO.private(`new-message.${this.state.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
			/**
			 * varificar si hay chat o coversaciones abiertas ---> si las hay solo actualizo las conversaciones
			 * sino solo actualizo la lista de mensaje sin leer
			 */
			if(this.state.chatopen.open === true && parseInt(data.chat_id) === parseInt(this.state.chatopen.chat_id)){
				axios.get(API.urlApi+'getMessage/'+data.chat_id, headers).then(response =>{
					this.conversationsCallback(response.data.result, data.user_emisor);
				}).catch(error =>{
					console.log(error);
				});
			}else{
				if(this.state.access === 'Mg=='){
					//console.log('ACTUALIZAR LISTA DE CHAT USER ....');
					this.chatsU();
				}else{
					//console.log('FALTO EL ACTUALIZAR SUBCHAT CON MENSAJE NUEVO....');
					this.chatsM();
				}
			}
		});
	}

	/**
	 * @returns 
	 */
	userAuth = () =>{
		getuserAuth().then(response => {
			this.setState({userAuth:response.result, access:response.access});
			this.config();
			if(this.state.access === 'Mg=='){
				this.chatsU();
			}else{
				this.chatsM();
			}			
		});				
	}

	conversationsCallback = (getconversations, getuserto) => {
		this.setState({conversations:getconversations, userTo:getuserto})
		if(this.state.access === 'Mg=='){
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
	}

	modifyMessage= (data) => {
		this.setState({message: data})
	}

	/***
	 * funcion encargada de retornar el menu de opciones vertical izquierdo
	 * mediante el componente <SidebarMenu /> en el cual se pasan dos props
	 * callbackCloseEmjoi y auth
	 */
	sidebarMenu=()=>{		
		if(this.state.userAuth !== ''){
			return (<SidebarMenu callbackCloseEmjoi={this.callbackCloseEmjoi} auth={this.state.userAuth} />); 
		}   	
	}
	
	chatLeftSidebar=()=>{
		return (<ChatLeftSidebar 
					callbackCloseEmjoi={this.callbackCloseEmjoi} 
						getChatsM={this.state.getChatsM} 
							getChatsU={this.state.getChatsU} 
								auth={this.state.userAuth} 
									access={this.state.access} 
										openchatCallback={this.openchatCallback}  
											conversationsCallback={this.conversationsCallback} />);
	}
	
	conversation=()=>{
		return (<Conversation 
					callbackCloseEmjoi={this.callbackCloseEmjoi} 
						parent={this.state}  
							conversations={this.state.conversations} 
								userTo={this.state.userTo}/>);
	}

	/**
	 * función encargada de  alterar estilo css mediante clases
	 * puede ser implementada mediante eventos js como onclick
	 */
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