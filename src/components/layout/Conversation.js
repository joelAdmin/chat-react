import React, {useState, useEffect} from 'react';
import ListConversation from './ListConversation.js';
import ListConversationFile from './ListConversationFile.js';
import ListConversationAudio from './ListConversationAudio.js';
import FooterChatOpen from './FooterChatOpen.js';
import HeadChatOpen from './HeadChatOpen.js';
import {IMG, random, API, headers} from '../lib/Lib';
import {SpinnerLoading as SpinnerLoad} from '../helpers/SpinnerLoading';
import axios from 'axios';

import $ from 'jquery';

import {loading} from '../../features/user/chatSlice';
import {getConversation} from '../../features/user/conversationSlice';


import {useSelector, useDispatch} from 'react-redux';

const Conversation = (props) => { 

    const estado = useSelector((state) => state);
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        mensaje:'',
        emisor_id: 0,
        receptor_id:0,
        chat_id:0
    });

    const [emojiTextoValue, setEmojiTextoValue] = useState('');
    const [chatId, setChatId] = useState(0);    

    useEffect(() => {          
        /**
         * solo se ejecuta cuando hacemos click en open chat
         * estado.chat.loading viene en false desde useLisChatMaster
         * useLisChatMaster
         * */
        //handleSendMessage('');
        if((estado.chat.openChat.open && !estado.chat.loading) && (chatId != estado.chat.openChat.chat_id)){
            dispatch(loading(true));
            topScroll();
        }     
    }, [estado.conversation.getConversation]);


    useEffect(() => {     
        
        if(form.mensaje.length > 0){
            console.log('Form actualizando2'); 
        }     
    }, []);

    useEffect(() => {  
        //handleSendMessage('');
        if(form.mensaje.length > 0){
            //console.log('Form actualizando'); 
            //console.log(form);
            //handleSubmit();
        }    
    });

    const loadingFuntion = () =>{
        if(estado.chat.openChat.open === true){
            document.getElementById('loading').innerHTML='';
        }
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

    const showProfile = () => {
        $('.user-profile-sidebar').show();
    }

    const handleSubmit = (value) => {
        let formData = {
            emisor_id: estado.auth.userAuth.usuario_id,
            receptor_id:estado.chat.openChat.emisor_id,
            chat_id:estado.chat.openChat.chat_id,
            mensaje:value 
        }

        setForm(formData);
        const vrandom = random();     
        const text = htmlMessageTemp(vrandom, props.parent.userAuth.avatar, value);
        if( formData.mensaje.length > 0){   
            $("#chat-conversation-list").append(text);
            $('#new'+vrandom).toggle({height:1000});
            topScroll();            
            axios.post(process.env.REACT_APP_URL_API+'sendMessage', formData, headers).then(response => {            
                if(response.data.res){  
                    $('#new'+vrandom).removeClass("opacity-5");                                 
                }else{
                    console.log('error al enviar mensaje');
                }      
            }).catch(error => {
                console.log('Error 0001x Send form', error);
            });
        }
    }

    const htmlMessageTemp =(vrandom,avatar, text) => {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const texto   =  '<li id="new'+vrandom+'" class="sendMessage right opacity-5" style="list-style:none; display:none;">'+
                            '<div class="conversation-list">'+
                                '<div class="chat-avatar">'+
                                    '<img src="'+avatar+'" alt="" />'+
                                '</div>'+
                                '<div class="user-chat-content">'+                                            
                                    '<div class="ctext-wrap">'+
                                        '<div class="ctext-wrap-content">'+                                                     
                                        '<div className="mb-0"><p></p>'+ 
                                            text+'</div>'+
                                        '<p className="chat-time mb-0">'+
                                            '<i className="ri-time-line align-middle"></i>'+ 
                                            `<span className="align-middle">${year}-0${month}-${day} 00:00:00</span>`+
                                        '</p>'+                                                                                                
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

    const renderHeadChatOpen = () => {
        return (<React.Fragment>{props.conversations.length > 0 &&                    
            <div className="row align-items-center">
                <div className="col-sm-4 col-8">
                    <div className="media align-items-center">
                        <div className="d-block d-lg-none mr-2">
                            <a href="/#" className="user-chat-remove text-muted font-size-16 p-2"><i className="ri-arrow-left-s-line"></i></a>
                        </div>
                        <div className="mr-3">
                            {Object(props.userTo).nombre !== 'undefined' &&
                                <img src={(Object(props.userTo).avatar !== null) ? Object(props.userTo).avatar : IMG} className="rounded-circle avatar-xs" alt="" />
                            }                                            
                        </div>
                        <div className="media-body overflow-hidden">{props.parent.openchat===true && <b>gggggg</b>}
                            <h5 className="font-size-16 mb-0 text-truncate"><a href="/#" onClick={showProfile} className="text-reset user-profile-show">{Object(props.userTo).nombre} {Object(props.userTo).apellido}</a> <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i></h5>
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
                                        <input type="text" className="form-control bg-light border-0" placeholder="Search....."/>
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
                                    <a className="dropdown-item d-block d-lg-none user-profile-show" href="/#"   >View profilesss <i className="ri-user-2-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#"   >Archive <i className="ri-archive-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#"   >Muted <i className="ri-volume-mute-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#"   >Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                </div>
                            </div>
                        </li>                                        
                    </ul>
                </div>
            </div> 
        } </React.Fragment>);
    }

    const handleHideViewUserTo = () => {
        if($('#to-user-profile-sidebar').css('display')=='none'){
            $('#to-user-profile-sidebar').show(200);
        }else{
            $('#to-user-profile-sidebar').hide(200);
        }
    }

    const renderUserProfileSidebar = () => {
        return (<React.Fragment>
            {/* start profile user */}
            <div className="px-3 px-lg-4 pt-3 pt-lg-4">
                <div className="user-chat-nav text-right">
                    <button type="button" onClick={handleHideViewUserTo} className="btn nav-btn" id="user-profile-hide">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
            </div>
            <div className="text-center p-4 border-bottom">
                <div className="mb-4">
                    <img src={(Object(props.userTo).avatar !== null) ? Object(props.userTo).avatar : IMG} className="rounded-circle avatar-lg img-thumbnail" alt="" />
                </div>

                <h5 className="font-size-16 mb-1 text-truncate">{Object(props.userTo).nombre} {Object(props.userTo).apellido}</h5>
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
                                    <h5 className="font-size-14">{Object(props.userTo).nombre} {Object(props.userTo).apellido}</h5>
                                </div>

                                <div className="mt-4">
                                    <p className="text-muted mb-1">Email</p>
                                    <h5 className="font-size-14">{Object(props.userTo).email}</h5>
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
        </React.Fragment>);
    }

    const renderListConversations = () => {
        return (<React.Fragment>
            {estado.conversation.getConversation.length > 0 &&
                <div id="chat-conversation" onClick={props.callbackCloseEmjoi} className="chat-conversation p-3 p-lg-4" data-simplebar="init">SI
                    <ul id="chat-conversation-list" className="list-unstyled mb-0">  
                        {Object.values(estado.conversation.getConversation).map((values, key) => {
                            if(values.ogg === null){
                                if(values.attachment === 0){
                                    return <ListConversation  key={key} values={values} {...props} />
                                }else{
                                    return <ListConversationFile key={key} values={values} {...props} />
                                }
                            }else{
                                return <ListConversationAudio  key={key} values={values} {...props} />                                                                                          
                            }
                        })}
                    </ul>
                </div>                           
            }
        </React.Fragment>);
    }

    const preRender = () => {

        if(estado.chat.openChat.open)
        {
            /**
             * cuando damos click en un sub menu por primera vez
             */
            if(!estado.chat.loading)
            {
                return (            
                    <div className="user-chat w-100">
                        <div className="d-lg-flex">                   
                            <React.Fragment>
                                <div className="w-100">
                                    <div onClick={props.callbackCloseEmjoi} className="p-3 p-lg-4 border-bottom">
                                        <HeadChatOpen {...props}/>   
                                        <SpinnerLoad />
                                    </div>                  
                                </div>                           
                                <div id="to-user-profile-sidebar" onClick={props.callbackCloseEmjoi} className="user-profile-sidebar"></div>    
                            </React.Fragment>                   
                        </div>
                    </div>
                );
            }else if(estado.chat.loading)
            {
                return (            
                    <div className="user-chat w-100">
                            <div className="d-lg-flex">
                                <React.Fragment>
                                    <div className="w-100">
                                        <div onClick={props.callbackCloseEmjoi} className="p-3 p-lg-4 border-bottom">   
                                            <HeadChatOpen {...props}/>      
                                        </div>
                                        {estado.chat.loading &&
                
                                            renderListConversations()
                                        }

                                        {!estado.chat.loading &&                                            
                                            <SpinnerLoad />                                            
                                        }                                    

                                        {estado.conversation.getConversation.length > 0 &&
                                            <FooterChatOpen 
                                                auth={props.parent.userAuth} 
                                                callbackCloseEmjoi={props.callbackCloseEmjoi} 
                                                callbackHandleSubmit={handleSubmit} 
                                                parent={{form:form, emojiTextoValue:emojiTextoValue}} 
                                            />
                                        }
                                        
                                    </div>                           
                                    <div id="to-user-profile-sidebar" onClick={props.callbackCloseEmjoi} className="user-profile-sidebar">
                                        {renderUserProfileSidebar()}
                                    </div>                         
                                </React.Fragment>                       
                            </div>
                    </div>
                );
            }
        }else
        {
            /**
             * vista principal solo se cargar al inicio cuando 
             * no hay accion de eventos
             */
            return (            
                <div className="user-chat w-100">
                    <div className="d-lg-flex">                   
                        <React.Fragment>
                            <div className="w-100">
                                <div onClick={props.callbackCloseEmjoi} className="p-3 p-lg-4 border-bottom"></div>                                 
                            </div>                           
                            <div id="to-user-profile-sidebar" onClick={props.callbackCloseEmjoi} className="user-profile-sidebar"></div>    
                        </React.Fragment>                   
                    </div>
                </div>
            );
        }
    }    

    return(preRender());
}

export default Conversation;