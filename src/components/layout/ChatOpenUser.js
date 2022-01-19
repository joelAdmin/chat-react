import React, {Component} from "react";
import axios from "axios";
import {API, IMG, TIMERMESSAGE, headers} from '../lib/Lib';
//import getConversations from '../helpers/Conversations'
import getChatsU from '../helpers/ChatsU';


class ChatOpenUser extends Component {

    constructor(props){
        super(props);
        this.state = ({
            chats: this.props.parent.getChatsU,
            auth:this.props.parent.auth,
            userTo:{}
        });
    }

    updateUserTo =(data)=>{ 
        if(this.state.auth.usuario_id === data.emisor_id){
            let userTo = {
                chat_id:data.chat_id,
                    usuario_id:data.usuarioid_receptor,
                        nombre:data.nombre_receptor,
                                    apellido: data.apellido_receptor,
                                        avatar: data.avatar_receptor,
                                            email: data.email_receptor,
                                                conectado:data.conectado_receptor

            }
           this.setState({
                userTo:userTo
           });
        }else{
            let userTo = {
                chat_id:data.chat_id,
                    usuario_id:data.usuarioid_emisor,
                        nombre:data.nombre_emisor,
                            apellido: data.apellido_emisor,
                                avatar: data.avatar_emisor,
                                    email: data.email_emisor,
                                        conectado:data.conectado_emisor
            }

            this.setState({
                userTo:userTo
            });           
        }

        //console.log( this.state.userTo) 
    }

    openConversation = (chat_id) =>{
        this.props.parent.openchatCallback(true, chat_id);
        this.props.parent.conversationsCallback([]);
        this.updateUserTo([]);
        axios.get(API.urlApi+'getMessage/'+chat_id, headers).then(response =>{
            this.updateUserTo(response.data.result[0]);  
            this.props.parent.conversationsCallback(response.data.result, this.state.userTo);
        }).catch(error =>{
            console.log(error);
        });
    }

    componentDidMount(){
    }

    componentDidUpdate(){
    
    }

    render(){
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
                        <h5 className="mb-3 px-3 font-size-16">Recientes {this.props.parent.conversations} {this.props.parent.auth.usuario_id}</h5>
                        <div className="chat-message-list" data-simplebar>
                            <ul className="list-unstyled chat-list chat-user-list">
                                {this.props.parent.getChatsU.length > 0 ?
                                    Object.values(this.props.parent.getChatsU).map((value, key) => {
                                        return (
                                            <li key={key} className="unread">
                                                <a href="/#" onClick={()=>{this.openConversation(value.chat_id)}} >
                                                    <div className="media">{/* away online offline */}
                                                        <div className={value.conectado > 0 ? "chat-user-img online align-self-center mr-3" : "chat-user-img offline align-self-center mr-3"} >
                                                            <img src={value.avatar !== '' ? value.avatar : IMG } className="rounded-circle avatar-xs" alt=""/>
                                                            <span className="user-status"></span>
                                                        </div>
                                                        <div className="media-body overflow-hidden">
                                                            <h5 className="text-truncate font-size-15 mb-1">{value.observacion}</h5>
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
                                            </li>
                                        )
                                    }) :
                                    <li>No, hay chats</li>                                
                                }
                            </ul>
                        </div>

                    </div>
                    {/* End chat-message-list */}
                </div>
        );
    }
}

export default ChatOpenUser;