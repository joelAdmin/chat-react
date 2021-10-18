import React, {Component} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import getuserAuth from './helpers/UserAuth';
import {ECHO} from './lib/Lib';


class Base extends Component
{
	constructor(props){
		super(props);			
		this.state = {
			userAuth:[],
			access:'',
			conversations: [],
			userTo:{}
		}
	}

	componentDidMount() {
		this.userAuth();
	}

	componentDidUpdate(){
	}

	config =()=>{
		ECHO.private(`new-message.${this.state.userAuth.usuario_id}`).listen('.NewMessage', (data)=>{
			console.log('esto es un nuevo mensaje', data)
		});
	}

	userAuth = () =>{
		getuserAuth().then(response => {
			this.setState({userAuth:response.result, access:response.access});
			this.config();
		});		   
	}

	sidebarMenu=()=>{		
		if(this.state.userAuth !== ''){
			return (<SidebarMenu auth={this.state.userAuth}></SidebarMenu>); 
		}   	
	}

	/**** number */
	conversationsCallback = (getconversations, getuserto)=>{
		this.setState({conversations:getconversations, userTo:getuserto})
	}

	modifyMessage= (data) => {
			this.setState({message: data})
	}
	
	chatLeftSidebar=()=>{
		return (<ChatLeftSidebar auth={this.state.userAuth} access={this.state.access}  conversationsCallback={this.conversationsCallback}></ChatLeftSidebar>);
	}
	
	conversation=()=>{
		return (<Conversation auth={this.state.userAuth} message={this.state.message} conversations={this.state.conversations} userTo={this.state.userTo}></Conversation>);
	}


	render(){
		return (
			<div className="layout-wrapper d-lg-flex">u-{this.state.userAuth.usuario_id}				
				{this.sidebarMenu()}				
				{this.chatLeftSidebar()}
				{this.conversation()}
			</div>
		);
	}
}

export default Base;