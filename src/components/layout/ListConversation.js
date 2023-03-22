import React, {useEffect, useState} from 'react';
import {HTML} from '../lib/Lib';
import {random, IMG} from '../lib/Lib';
import {useSelector, useDispatch} from 'react-redux';

const ListConversation = (props) => {
    const estado = useSelector((state) => state);
    let claseCss = '';
    let avatar = IMG;
    let nombre = '';
    if((parseInt(props.values.emisor_id) !== parseInt(estado.auth.userAuth.usuario_id))){
        claseCss = 'right';
        avatar   = (props.values.avatar_receptor == null)?IMG:estado.auth.userAuth.avatar;
        nombre   = estado.auth.userAuth.nombres;
    }else
    {
        avatar   = (props.userTo.avatar == null)?IMG:props.userTo.avatar;
        nombre   = props.userTo.nombre;
    }
    const conversation = () => {
        return (                        
            <li key={random} className={claseCss}>
                <div className="conversation-list">
                    <div className="chat-avatar">
                        <img src={avatar} alt="avatar" />                       
                    </div>

                    <div className="user-chat-content">
                        <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                                <div className="mb-0"><p></p>
                                {HTML(props.values.mensaje)}
                                </div>
                                <p className="chat-time mb-0">
                                    <i className="ri-time-line align-middle"></i> 
                                    <span className="align-middle">{props.values.fecha} </span>
                                </p>
                            </div>
                            <div className="dropdown align-self-start">
                                <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ri-more-2-fill"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/#">Copy <i className="ri-file-copy-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-name">{nombre}</div>
                    </div>
                </div>
            </li>  
            );
    }

    return(conversation());
}

export default ListConversation;