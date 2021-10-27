import React, {Component} from 'react';
import ListConversation from './ListConversation.js';
import ListConversationFile from './ListConversationFile.js';
import ListConversationAudio from './ListConversationAudio.js';
import BtnSendAudio from './BtnSendAudio.js';
import {IMG, random, API, headers} from '../lib/Lib';
import axios from 'axios';

import $ from 'jquery';

class Conversation extends Component{

    constructor(props){
        super(props);
        this.state = {
            form:{
                mensaje:'',
                emisor_id: 0,
                receptor_id:0,
                chat_id:0
            }, 
            emojiTextoValue:''
        };
        
       // this.updatehidden();
    }

    componentDidMount(){
        this.loading();
    }

    loading =()=>{
        if(this.props.parent.chatopen.open === true){
            document.getElementById('loading').innerHTML='';
        }
    }

    componentDidUpdate(){
        this.topScroll(true);
        //this.updatehidden();
        
        //console.log('constructor', Object(this.props.userTo).usuario_id);
        //console.log('props:', this.props);
    }

    topScroll =(validate)=>{
        
        if(validate === true){
            if(this.props.parent.chatopen.open === true){
                if(this.props.conversations.length > 0){
                    setTimeout(function(){
                        var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                        $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 900 );
                    }, 300);
                }
            }
        }else{
            if(this.props.conversations.length > 0){
                setTimeout(function(){
                    var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                    $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 900 );
                }, 300);
            }
        }        
    }

    showProfile =()=>{
        $('.user-profile-sidebar').show();
    }

    handleSendMessage = (value)=>{
       this.setState({
            /*form:{
                emisor_id:this.props.parent.chatopen.emisor_id,
                receptor_id:Object(this.props.parent.userTo).usuario_id,
                chat_id:this.props.parent.chatopen.chat_id,
                [e.target.name]:e.target.value
            }*/
            form:{
                emisor_id:this.props.parent.chatopen.emisor_id,
                receptor_id:Object(this.props.parent.userTo).usuario_id,
                chat_id:this.props.parent.chatopen.chat_id,
                mensaje:value
            },
            emojiTextoValue:value
        });
        //console.log('form:', this.state.form);
    }

    handleSendMessageAudio = ()=>{
        this.setState({
             form:{
                 emisor_id:this.props.parent.chatopen.emisor_id,
                 receptor_id:Object(this.props.parent.userTo).usuario_id,
                 chat_id:this.props.parent.chatopen.chat_id,
                 mensaje:''
             }
         });
         ///console.log('form:', this.state.form);
     }

    htmlText =(vrandom,avatar, text)=>{
        const texto   =  '<li id="new'+vrandom+'" class="right" style="list-style:none; display:none;">'+
                            '<div class="conversation-list">'+
                                '<div class="chat-avatar">'+
                                    '<img src="'+avatar+'" alt="" />'+
                                '</div>'+
                                '<div class="user-chat-content">'+                                            
                                    '<div class="ctext-wrap">'+
                                        '<div class="ctext-wrap-content">'+                                                     
                                        '<p class="mb-0">'+text+'</p>'+                                                                                                 
                                        '</div>'+
                                        '<div class="dropdown align-self-start">'+
                                            '<a class="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                                                '<i class="ri-more-2-fill"></i>'+
                                            '</a>'+
                                            '<div class="dropdown-menu">'+
                                                '<a class="dropdown-item" href="/#">Copy <i class="ri-file-copy-line float-right text-muted"></i></a>'+
                                                '<a class="dropdown-item" href="/#">Save <i class="ri-save-line float-right text-muted"></i></a>'+
                                                '<a class="dropdown-item" href="/#">Forward <i class="ri-chat-forward-line float-right text-muted"></i></a>'+
                                                '<a class="dropdown-item" href="/#">Delete <i class="ri-delete-bin-line float-right text-muted"></i></a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>';
        return texto;
    }

    handleSubmit = (event) => {
        const vrandom = random();
        event.preventDefault();
        const text = this.htmlText(vrandom, this.props.parent.userAuth.avatar, this.state.form.mensaje);
     
        console.log('datos ha enviar', this.state.form);
        console.log('datos ha enviar chat_id', this.state.form.chat_id);

        if( this.state.form.mensaje.length > 0){       
            $("#chat-conversation-list").append(text);
            $('#new'+vrandom).toggle({height:1000});
            //$("#mensaje").val(''); 
            this.handleSendMessage(''); 
            
            //enviar menssaje
            axios.post(API.urlApi+'sendMessage', this.state.form, headers).then(response => {            
                if(response.data.res){
                    console.log('go:', response.data);
                    //alert('mensaje enviado ..');
                }else{
                    console.log('no:', response.data);
                    //alert('mensaje NO enviado ..');
                }      
            }).catch(error => {
                console.log('Error 0001x Send form', error);
            }); 
        }
    }

    conversation=()=>{ 
        return (            
            <div className="user-chat w-100">
                <div className="d-lg-flex">
                    {this.props.parent.chatopen.open===true &&
                    <>
                    {/* start chat conversation section */}
                    <div className="w-100">
                        <div className="p-3 p-lg-4 border-bottom">   
                        {this.props.conversations.length > 0 &&                    
                            <div className="row align-items-center">
                                <div className="col-sm-4 col-8">
                                    <div className="media align-items-center">
                                        <div className="d-block d-lg-none mr-2">
                                            <a href="/#" className="user-chat-remove text-muted font-size-16 p-2"><i className="ri-arrow-left-s-line"></i></a>
                                        </div>
                                        <div className="mr-3">
                                            {Object(this.props.userTo).nombre !== 'undefined' &&
                                                <img src={(Object(this.props.userTo).avatar !== null) ? Object(this.props.userTo).avatar : IMG} className="rounded-circle avatar-xs" alt="" />
                                            }                                            
                                        </div>
                                        <div className="media-body overflow-hidden">{this.props.parent.openchat===true && <b>gggggg</b>}
                                            <h5 className="font-size-16 mb-0 text-truncate"><a href="/#" onClick={this.showProfile} className="text-reset user-profile-show">{Object(this.props.userTo).nombre} {Object(this.props.userTo).apellido}</a> <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i></h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-8 col-4">
                                    <ul className="list-inline user-chat-nav text-right mb-0">                                        
                                        <li className="list-inline-item">
                                            <div className="dropdown">
                                                <button className="btn nav-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="ri-search-line"></i>
                                                </button>
                                                <div className="dropdown-menu p-0 dropdown-menu-right dropdown-menu-md">
                                                    <div className="search-box p-2">
                                                        <input type="text" className="form-control bg-light border-0" placeholder="Search.."/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-inline-item d-none d-lg-inline-block">
                                            <button type="button" className="btn nav-btn user-profile-show">
                                                <i className="ri-user-2-line"></i>
                                            </button>
                                        </li>
                                        <li className="list-inline-item">
                                            <div className="dropdown">
                                                <button className="btn nav-btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="ri-more-fill"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item d-block d-lg-none user-profile-show" href="/#"   >View profile <i className="ri-user-2-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#"   >Archive <i className="ri-archive-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#"   >Muted <i className="ri-volume-mute-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#"   >Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                </div>
                                            </div>
                                        </li>                                        
                                    </ul>
                                </div>
                            </div> 
                        }                      
                        </div>
                       
                        {/* end chat user head */}

                        {/* start chat conversation */}
                        {(this.props.conversations.length > 0 ) &&
                            <div id="chat-conversation" className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                <ul id="chat-conversation-list" className="list-unstyled mb-0">  
                                     {Object.values(this.props.conversations).map((values, key) => {
                                        if(values.ogg === null){
                                            if(values.attachment === 0){
                                                return <ListConversation  key={key} values={values} {...this.props} />
                                            }else{
                                                return <ListConversationFile key={key} values={values} {...this.props} />
                                            }
                                        }else{
                                            return <ListConversationAudio  key={key} values={values} {...this.props} />                                                                                          
                                        }
                                    } )}
                                </ul>
                            </div>                            
                        }

                        {this.props.conversations.length < 1 &&
                             <div id="chat-conversation" className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                <div id="loading" className="d-block">
                                    <center>
                                        <div className="justify-content-center">
                                            <div className="loadingio-eclipse">
                                                <div className="ldio-rpinwye8j0b">
                                                    <div></div>
                                                </div>
                                            </div>           
                                        </div>
                                    </center>
                                </div>
                             </div>
                        }
                        {/* end chat conversation end */}

                        {/* start chat input section */}
                        {this.props.conversations.length > 0 &&
                            <BtnSendAudio callbackHandleSubmit={this.handleSubmit} callbackHandleSendMessage={this.handleSendMessage} callbackHandleSendMessageAudio={this.handleSendMessageAudio} parent={this.state} />
                        }
                        {/* end chat input section */}
                    </div>
                    {/* end chat conversation section */}

                    {/* start User profile detail sidebar */}
                    <div className="user-profile-sidebar">
                        <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                            <div className="user-chat-nav text-right">
                                <button type="button" className="btn nav-btn" id="user-profile-hide">
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-center p-4 border-bottom">
                            <div className="mb-4">
                                <img src={(Object(this.props.userTo).avatar !== null) ? Object(this.props.userTo).avatar : IMG} className="rounded-circle avatar-lg img-thumbnail" alt="" />
                            </div>

                            <h5 className="font-size-16 mb-1 text-truncate">{Object(this.props.userTo).nombre} {Object(this.props.userTo).apellido}</h5>
                            <p className="text-muted text-truncate mb-1"><i className="ri-record-circle-fill font-size-10 text-success mr-1"></i> Active</p>
                        </div>
                        {/* End profile user */}

                        {/* Start user-profile-desc */}
                        <div className="p-4 user-profile-desc" data-simplebar>
                            <div className="text-muted">
                                <p className="mb-4">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
                            </div>

                            <div id="profile-user-accordion" className="custom-accordion">
                                <div className="card shadow-none border mb-2">
                                    <a href="#collapseOne" className="text-dark" data-toggle="collapse"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="font-size-14 m-0">
                                                <i className="ri-user-2-line mr-2 align-middle d-inline-block"></i> About
                                                <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>

                                    <div id="collapseOne" className="collapse show"
                                            aria-labelledby="headingOne" data-parent="#profile-user-accordion">
                                        <div className="card-body">

                                            <div>
                                                <p className="text-muted mb-1">Name</p>
                                                <h5 className="font-size-14">{Object(this.props.userTo).nombre} {Object(this.props.userTo).apellido}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Email</p>
                                                <h5 className="font-size-14">{Object(this.props.userTo).email}</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Time</p>
                                                <h5 className="font-size-14">11:40 AM</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Location</p>
                                                <h5 className="font-size-14 mb-0">California, USA</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End About card */}

                                {/* End Attached Files card */}
                            </div>
                            {/* end profile-user-accordion */}
                        </div>
                        {/* end user-profile-desc */}
                    </div>
                    {/* end User profile detail sidebar */}
                    </>
                    }
                </div>
            </div>
        );
    }


    render(){
        return(this.conversation());
    }
}
export default Conversation;