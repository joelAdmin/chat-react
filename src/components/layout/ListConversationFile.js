import React from "react";
import { Component } from "react";
import {random, IMG, API, headersBlod} from '../lib/Lib';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
//import * as myModule from '../../assets/libs/magnific-popup/jquery.magnific-popup.min.js';
//import { MagnificPopup } from 'react-magnific-popup';

class ListConversationFile extends Component {

    constructor(props){
        super(props);
        this.state = ({
            mensaje_id:JSON.parse(this.props.values.mensaje_id),
            imgSrcTemp :'',
            file_ext :  JSON.parse(this.props.values.mensaje).upload_data.file_ext,
            is_image:  JSON.parse(this.props.values.mensaje).upload_data.is_image,
            srcFile:JSON.parse(this.props.values.mensaje).upload_data.imagen_nueva,
            nameFileDownload:JSON.parse(this.props.values.mensaje).upload_data.file_name,
            find_1: ['.doc', '.docx', '.dot', '.dotx'],
            find_2: ['.xls', '.xlsm', '.xlm', '.xlt', '.xltm', '.xltx'],
            find_3: ['.zip', '.rar', '.tar'],
            find_4: ['.pps', '.ppsm', '.ppsx', '.ppt', '.pptm', '.pptx'],
            find_5: ['.pdf'],
        })
    }

    componentDidMount(){
       
    }

    getFileBK = () =>{
       axios.get(API.urlApi+'download/'+this.state.mensaje_id, headersBlod).then(response =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf');
            document.body.appendChild(link);
            link.click();
            console.log('imagen:', url);
            this.setState({
                imgSrcTemp:url
            });
        }).catch(error =>{
            console.log(error);
        });
    }

    handleGetFile = (event) =>{
        const link = document.createElement('a');
        link.href = this.state.srcFile;
        document.body.appendChild(link);
        link.click();
    }

    handleGetPopupImg = () => {console.log('click en la imagen  ');
    //MaginificPopup.trigger('.popup-img', 'open');
        //const magnificPopup = require('../../assets/libs/magnific-popup/jquery.magnific-popup.min.js');
        
        $(".popup-img").magnificPopup({
            type: "image",
            closeOnContentClick: !0,
            mainClass: "mfp-img-mobile",
            image: { verticalFit: !0 }
        });
    }

    imagen =()=>{
        return (<li key={uuidv4()} className={(this.props.values.receptor_id !== this.props.parent.chatopen.emisor_id)?'right':''}>
            <div className="conversation-list">
                <div className="chat-avatar">
                    <img src={(this.props.values.avatar_emisor !== null)?this.props.values.avatar_emisor:IMG} alt="avatar"/>
                </div>
                <div className="user-chat-content">
                    <div className="ctext-wrap">
                        <div className="ctext-wrap-content">
                            <ul className="list-inline message-img  mb-0">                                            
                                <li key={uuidv4()}  className="list-inline-item message-img-list">
                                    <div>
                                        <a onClick={this.handleGetPopupImg} href="/#" title="Project 1" className="popup-img d-inline-block m-1">
                                            <img src={this.state.srcFile} alt="imagen" className="rounded border"/>
                                        </a>
                                    </div>
                                    <div className="message-img-link">
                                        <ul className="list-inline mb-0">
                                            <li key={uuidv4()} className="list-inline-item">
                                                <a href="/#" onClick={()=>{this.handleGetFile}} download={this.state.nameFileDownload}>
                                                    <i className="ri-download-2-line"></i>
                                                </a>
                                            </li>
                                            <li key={uuidv4()} className="list-inline-item dropdown">
                                                <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="ri-more-fill"></i>
                                                </a>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="/#">Copys <i className="ri-file-copy-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                                    <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>                                            
                            </ul>
                            <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">10:09</span></p>
                        </div>
        
                        <div className="dropdown align-self-start">
                            <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="ri-more-2-fill"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a href="/#"  className="dropdown-item" onClick={()=>{this.handleGetFile}} download={this.state.nameFileDownload}>Descargar<i className="ri-download-2-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="conversation-name">Doris Brown</div>
                </div>
            </div>                               
        </li>);
    }

    file =()=>{
        return (                        
            <li key={uuidv4()} className={(this.props.values.receptor_id !== this.props.parent.chatopen.emisor_id)?'right':''}>
                <div className="conversation-list">
                    <div className="chat-avatar">
                        <img src={this.props.values.avatar_emisor} alt="" />
                    </div>
                    <div className="user-chat-content">
                        <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                                <div className="mb-0">
                                    {this.state.find_1.some(find_1 => find_1 === this.state.file_ext) ?
                                        <i className="fa fa-file-word-o fa-5x text-info"></i> : [
                                            (this.state.find_2.some(find_2 => find_2 === this.state.file_ext) ?
                                                <i className="fa fa-file-excel-o fa-5x text-success"></i> : [
                                                    (this.state.find_3.some(find_3 => find_3 === this.state.file_ext) ?
                                                        <i className="fa fa-archive-o fa-5x"></i> : [
                                                            (this.state.find_4.some(find_4 => find_4 === this.state.file_ext) ?
                                                                <i className="fa fa-file-powerpoint-o fa-5x text-danger"></i> : [
                                                                    (this.state.find_5.some(find_5 => find_5 === this.state.file_ext) ?
                                                                        <i className="fa fa-file-pdf-o fa-5x text-danger"></i> :
                                                                        <i className="fa fa-file fa-5x"></i>
                                                                    )
                                                                ]
                                                            )
                                                        ]
                                                    )
                                                ]
                                            )
                                        ]
                                    }
                                </div>
                                <p className="chat-time mb-0">
                                    <i className="ri-time-line align-middle"></i> 
                                    <span className="align-middle">{this.props.values.fecha} </span>
                                </p>
                            </div>
                            <div className="dropdown align-self-start">
                                <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ri-more-2-fill"></i>
                                </a>
                                <div className="dropdown-menu">
                                    <a href="/#" className="dropdown-item" onClick={()=>{this.handleGetFile}} download={this.state.nameFileDownload}>Descargar <i className="ri-download-2-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                    <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="conversation-name">{this.props.values.nombre_emisor}</div>
                    </div>
                </div>
            </li>  
            );
    }

    preRender =()=>{
        if(this.state.is_image){
            return (this.imagen());
        }else{
            return (this.file());
        }       
    }

    render(){
        return (this.preRender());
    }
}

export default ListConversationFile;