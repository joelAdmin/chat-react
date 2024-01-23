import React from "react";
import {useEffect, useState} from "react";
import {random, IMG, API, headersBlod} from '../lib/Lib';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';
import * as myModule from '../../assets/libs/magnific-popup/jquery.magnific-popup.min.js';
import {useSelector, useDispatch} from 'react-redux';


const ListConversationFile = (props) => {


    const [mensaje_id, setmensaje_id] = useState(JSON.parse(props.values.mensaje_id));
    const [imgSrcTemp, setImgSrcTemp] = useState('');
    const [file_ext, setFile_ext] = useState(JSON.parse(props.values.mensaje).upload_data.file_ext);
    const [is_image, setIs_image] = useState(JSON.parse(props.values.mensaje).upload_data.is_image);
    const [srcFile, setSrcFile] = useState(JSON.parse(props.values.mensaje).upload_data.imagen_nueva);
    const [nameFileDownload, setNameFileDownload] = useState(JSON.parse(props.values.mensaje).upload_data.file_name);
    const [find_1, setFind_1] = useState(['.doc', '.docx', '.dot', '.dotx']);
    const [find_2, setFind_2] = useState(['.xls', '.xlsm', '.xlm', '.xlt', '.xltm', '.xltx']);
    const [find_3, setFind_3] = useState(['.zip', '.rar', '.tar']);
    const [find_4, setFind_4] = useState(['.pps', '.ppsm', '.ppsx', '.ppt', '.pptm', '.pptx']);
    const [find_5, setFind_5] = useState(['.pdf']);

    const estado = useSelector((state) => state);
    let claseCss = '';
    let avatar = IMG;
    let nombre = '';
    if((parseInt(props.values.receptor_id) !== parseInt(estado.auth.userAuth.usuario_id))){
        claseCss = 'right';
        avatar   = (props.values.avatar_receptor == null)?IMG:estado.auth.userAuth.avatar;
        nombre   = estado.auth.userAuth.nombres;
    }else
    {
        avatar   = (props.userTo.avatar == null)?IMG:props.userTo.avatar;
        nombre   = props.userTo.nombre;
    }

    const getFileBK = () =>{
        axios.get(API.urlApi+'download/'+mensaje_id, headersBlod).then(response =>{
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'file.pdf');
             document.body.appendChild(link);
             link.click();
             //console.log('imagen:', url);
             setImgSrcTemp({imgSrcTemp:url});
         }).catch(error =>{
             console.log(error);
         });
     }
 
     const handleGetFile = (event) =>{
         const link = document.createElement('a');
         link.href = srcFile;
         document.body.appendChild(link);
         link.click();
     }
 
     const handleGetPopupImg = () => {
         $(".popup-img").magnificPopup({
             items: {
                 src: srcFile
             },
             type: "image",
             tClose: 'Close (Esc)',
             tLoading: 'Loading...',            
             //closeOnContentClick: !0,
             mainClass: "mfp-img-mobile",
             image: { verticalFit: !0 }
         }).magnificPopup('open');
     }
 
     const imagen =()=>{
         return (<li key={uuidv4()} className={claseCss}>
             <div className="conversation-list">
                 <div className="chat-avatar">
                     <img src={avatar} alt="avatar"/>
                 </div>
                 <div className="user-chat-content">
                     <div className="ctext-wrap">
                         <div className="ctext-wrap-content">
                             <ul className="list-inline message-img  mb-0">                                            
                                 <li key={uuidv4()}  className="list-inline-item message-img-list">
                                     <div>
                                         <a onClick={handleGetPopupImg} href="/#" title="Project 1" className="popup-img d-inline-block m-1">
                                             <img src={srcFile} alt="imagen" className="rounded border"/>
                                         </a>
                                     </div>
                                     <div className="message-img-link">
                                         <ul className="list-inline mb-0">
                                             <li key={uuidv4()} className="list-inline-item">
                                                 <a href="/#" onClick={()=>{handleGetFile}} download={nameFileDownload}>
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
                                 <a href="/#"  className="dropdown-item" onClick={()=>{handleGetFile}} download={nameFileDownload}>Descargar<i className="ri-download-2-line float-right text-muted"></i></a>
                                 <a className="dropdown-item" href="/#">Save <i className="ri-save-line float-right text-muted"></i></a>
                                 <a className="dropdown-item" href="/#">Forward <i className="ri-chat-forward-line float-right text-muted"></i></a>
                                 <a className="dropdown-item" href="/#">Delete <i className="ri-delete-bin-line float-right text-muted"></i></a>
                             </div>
                         </div>
                     </div>
                     <div className="conversation-name">{nombre}</div>
                 </div>
             </div>                               
         </li>);
     }
 
     const file =()=>{
         return (                        
             <li key={uuidv4()} className={claseCss}>
                 <div className="conversation-list">
                     <div className="chat-avatar">
                         <img src={avatar} alt="" />
                     </div>
                     <div className="user-chat-content">
                         <div className="ctext-wrap">
                             <div className="ctext-wrap-content">
                                 <div className="mb-0">
                                     {find_1.some(find_1 => find_1 === file_ext) ?
                                         <i className="fa fa-file-word-o fa-5x text-info"></i> : [
                                             (find_2.some(find_2 => find_2 === file_ext) ?
                                                 <i className="fa fa-file-excel-o fa-5x text-success"></i> : [
                                                     (find_3.some(find_3 => find_3 === file_ext) ?
                                                         <i className="fa fa-archive-o fa-5x"></i> : [
                                                             (find_4.some(find_4 => find_4 === file_ext) ?
                                                                 <i className="fa fa-file-powerpoint-o fa-5x text-danger"></i> : [
                                                                     (find_5.some(find_5 => find_5 === file_ext) ?
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
                                     <span className="align-middle">{props.values.fecha} </span>
                                 </p>
                             </div>
                             <div className="dropdown align-self-start">
                                 <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                     <i className="ri-more-2-fill"></i>
                                 </a>
                                 <div className="dropdown-menu">
                                     <a href="/#" className="dropdown-item" onClick={()=>{handleGetFile}} download={nameFileDownload}>Descargar <i className="ri-download-2-line float-right text-muted"></i></a>
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
 
    const preRender = () =>{
         if(is_image){
             return (imagen());
         }else{
             return (file());
         }       
     }
 
     
    return (preRender());
}

export default ListConversationFile;