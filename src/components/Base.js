import React, {Component} from 'react';
import SidebarMenu from './layout/SidebarMenu.js';
import ChatLeftSidebar from './layout/ChatLeftSidebar.js';
import Conversation from './layout/Conversation.js';
import getuserAuth from './helpers/UserAuth';

class Base extends Component
{
	constructor(props){
		super(props);			
		this.state = {
			userAuth:[],
			access:'',
			conversations: []
		}
	}

	componentDidMount() {
		this.userAuth()	
	}

	userAuth = () =>{
		getuserAuth().then(response => {
			//console.log('userAuth:', response);
			this.setState({userAuth:response.result, access:response.access});
		});		   
	}

	sidebarMenu=()=>{		
		if(this.state.userAuth !== ''){
			return (<SidebarMenu auth={this.state.userAuth}></SidebarMenu>); 
		}   	
	}

	/**** number */
	conversationsCallback = (number)=>{
		this.setState({conversations:number})
	}

	modifyMessage= (data) => {
			this.setState({message: data})
	}
	
	chatLeftSidebar=()=>{
		return (<ChatLeftSidebar auth={this.state.userAuth} access={this.state.access}  conversationsCallback={this.conversationsCallback}></ChatLeftSidebar>);
	}
	
	conversation=()=>{
		return (<Conversation auth={this.state.userAuth} message={this.state.message} conversations={this.state.conversations}></Conversation>);
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