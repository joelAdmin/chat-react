import React, {Component} from "react";
import '../../assets/css/microfono.css';
import $ from 'jquery';
import axios from "axios";
import {API, headers} from '../lib/Lib';
import '../../assets/css/textarea.css';
import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.bubble.css"; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.core.css'; // ES6

import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import 'emoji-picker-react/dist/main.css';
import '../../assets/css/filehidden.css'

class BtnSendAudio extends Component {

    constructor(props){
        super(props); 
        this.state = {
            form:{
                mensaje:'',
                emisor_id: 0,
                receptor_id:0,
                chat_id:0,
                ogg:''
            },
            formFile:{
                mensaje:'',
                emisor_id: 0,
                receptor_id:0,
                chat_id:0,
                ogg:'',
                file:''
            }
        }
        this.props.callbackHandleSendMessageAudio();  
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
        
    }

    componentDidMount(){
        this.grabador();  
        //this.emojioneArea();
        this.handleChange = this.handleChange.bind(this);
        this.attachQuillRefs();     
        console.log('auth::>', this.props.auth);
    }

    componentDidUpdate(){
        this.attachQuillRefs()
    }

    /*
    efectoJquery2 =()=>{
        $('.ql-editor').on('keyup', function(){
             console.log('escribiendo otro ...', this.state.textoValue);
             if(this.state.textoValue === '<p><br></p'){
                 $('.btn-audio').show();
                 $('.btn-text').hide();
             }else{
                 $('.btn-audio').hide();
                 $('.btn-text').show();
             }
         });
 
         $('.ql-editor').on('blur', function(){
             if(this.state.textoValue !== '<p><br></p'){
                 console.log('blur ...');
                 $('.btn-audio').hide();
                 $('.btn-text').show();
             }
             
             if(this.state.textoValue === '<p><br></p'){
                 console.log('blur2 ...');
                 $('.btn-audio').show();
                 $('.btn-text').hide();
             }
         });
     }*/

    efectoJquery =()=>{
       $('.input-send-message').on('keyup', function(){
            if($(this).val() == ''){
                $('.btn-audio').show();
                $('.btn-text').hide();
            }else{
                $('.btn-audio').hide();
                $('.btn-text').show();
            }
        });

        $('.input-send-message').on('blur', function(){
            if($('.input-send-message').val() != ''){
                $('.btn-audio').hide();
                $('.btn-text').show();
            }
            
            if($('.input-send-message').val() == ''){
                $('.btn-audio').show();
                $('.btn-text').hide();
            }
        });
    }

    comprobarSoporteAudio = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    updateRequestAudio =(ogg)=>{
        const form = this.props.parent.form;
        this.props.callbackHandleSendMessageAudio();
        this.setState({
            form:{
                mensaje:form.mensaje,
                emisor_id: form.emisor_id,
                receptor_id:form.receptor_id,
                chat_id:form.chat_id,
                ogg:ogg
            }
        });
    }

    
    grabador =()=> {
        const selector_star = document.querySelector(".microphone");
        const selector_stop = document.querySelector(".microphoneStop");
        var gumStream;
        var recorder; 
        var input;
        var encodingType; 
        var encodeAfterRecord = true; 
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext; 
        var clicked = false;
        var mediaRecorder;
        const chunks = [];
        var timer;
        var connection = {};
        var connect = false;
        var microphonebar = document.getElementById("microphoneStopbar");   
        const thas = this;   
       
        $('.microphone').on("click", function() {
            clicked = true;
            if(!!navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                $('#microphone').hide();
                $('#microphoneStop').show();
                var constraints = { audio: true, video: false };
                navigator.mediaDevices.getUserMedia({  audio: true, video: false}).then(stream => {                        
                    audioContext = new AudioContext();
                    gumStream = stream;
                    input = audioContext.createMediaStreamSource(stream);
                    encodingType = 'wav';

                    /** guardar audio  */
                        /** se modifico el archivo  ../../assets/js/simple-web/js/WebAudioRecorder.min.js  
                        * con module.exports = n.WebAudioRecorder  al final para poder exportar el modulo 
                        * con  const WebAudioRecorder = require('../../assets/js/simple-web/js/WebAudioRecorder.min.js');
                        */
                    const WebAudioRecorder = require('../../assets/js/simple-weba/js/WebAudioRecorder.min.js');
                    /** esta faltando solucionar el problema de las doscarpetas simple-weba y simple-webe */
                    
                    recorder = new WebAudioRecorder(input, {
                        workerDir: "assets/js/simple-webe/js/", 
                        encoding: encodingType,
                        numChannels: 2, 
                        onEncoderLoading: function(recorder, encoding) {},
                        onEncoderLoaded: function(recorder, encoding) {}
                    });

                    recorder.onComplete = function(recorder, blob) {
                        var reader = new FileReader();
                        var base64data;
                        reader.readAsDataURL(blob);
                        reader.onloadend = function() {
                            base64data = reader.result;
                            thas.updateRequestAudio(base64data);
                            //console.log('form_',thas.state.form);                            
                            axios.post(API.urlApi+'sendMessageAudio', thas.state.form, headers).then(response => {            
                                if(response.data.res){
                                    //console.log('go:', response.data);
                                }else{
                                    //console.log('no:', response.data);
                                }      
                            }).catch(error => {
                                console.log('Error 0001x Send form', error);
                            });
                        }
                        //console.log('blob', blob.size);
                        
                        var audioObjectURL = window.URL.createObjectURL(blob);
                        var audio = '<audio title="audio" class="audio" controls=""><source src="'+audioObjectURL+'" type="audio/wav"></audio>';
                        var str = '<li class="right" style="list-style:none;">'+
                                        '<div class="conversation-list">'+
                                            '<div class="user-chat-content">'+                                            
                                                '<div class="ctext-wrap">'+
                                                    '<div class="ctext-wrap-content">'+                                                     
                                                        '<p class="mb-0">'+audio+'</p>'+                                                                                                 
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>'; 
                        $("#chat-conversation-list").append(str);  
                        setTimeout(function(){
                            var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                            $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 800 );
                        }, 100);
                    }

                    recorder.setOptions({
                        timeLimit: 120,
                        encodeAfterRecord: encodeAfterRecord,
                        ogg: { quality: 0.5 },
                        mp3: { bitRate: 160 }
                    });
                    recorder.startRecording();
                    /** end guardar audio */

                    /***efecto quality*/
                    document.getElementById("microphoneStop").classList.add("active");  
                    connection.stream = stream;
                    connection.context = audioContext;
                    connection.source = connection.context.createMediaStreamSource(stream);
                    connection.analyser = connection.context.createAnalyser();
                    connection.analyser.smoothingTimeConstant = .5;
                    connection.lastSample = new Uint8Array(1);
                    connection.source.connect(connection.analyser);  
                    function loop() {
                        connection.analyser.getByteFrequencyData(connection.lastSample);
                        var value = connection.lastSample[0],
                        percent = value / 255,
                        dB = connection.analyser.minDecibels + ((connection.analyser.maxDecibels - connection.analyser.minDecibels) * percent);
                        microphonebar.style.height = `${percent * 100}%`;
                    }  
                    timer = setInterval(loop, 100);                        
                    selector_stop.addEventListener("click",()=>{ 
                        gumStream.getAudioTracks()[0].stop(); 
                        recorder.finishRecording();
                        $('#microphone').show();
                        $('#microphoneStop').hide();
                    });
                    /** end efecto quality */
                });                
            }else{
                alert('no soportado');
            }
        });
    }

    emojioneArea =()=>{
        /*
            window.$("#mensaje").emojioneArea({
                inline: true,
                events: {
                    keyup: function (editor, event) {                      
                        if(editor.html() == ''){
                            $('.btn-audio').show();
                            $('.btn-text').hide();
                        }else {
                            if(event.keyCode == 13){
                            $('#mensaje').val(this.getText());
                            }else{
                                $('.btn-audio').hide();
                                $('.btn-text').show();
                            }
                        }
                    },
                    emojibtn_click: function (button, event) {
                        console.log('event:emojibtn.click, emoji=' + button.children().data("name"));
                    }
                }
            });
        */
        window.$("#mensaje").emojioneArea({
            pickerPosition: "top",
            filtersPosition: "bottom",
            tones: false,
            autocomplete: false,
            inline: true,
            hidePickerOnBlur: false
        });
    }

    handleChange = (value) => {
        this.props.callbackHandleSendMessage(value)
        if(this.props.parent.emojiTextoValue === '<p><br></p>'){
            $('.btn-audio').show();
            $('.btn-text').hide();
        }else{
            $('.btn-audio').hide();
            $('.btn-text').show();
        }
    }

    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    insertEmoji =(value)=>{
        var range = this.quillRef.getSelection();
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, ''+value)
    }

    onEmojiClick =(event, emojiObject)=>{
        this.insertEmoji(emojiObject.emoji);
    }

    showViewEmoji =(event)=>{
        if($('#contentEmoji').css('display')=='none'){
            $('#contentEmoji').show(200);
        }else{
            $('#contentEmoji').hide(200);
        }
    }

    handleUpload = (event) => {        
        var data = new FormData();
        data.append("chat_id", this.props.parent.form.chat_id);
        data.append("mensaje", '');
        data.append("emisor_id", this.props.parent.form.emisor_id);
        data.append("receptor_id", this.props.parent.form.receptor_id);
        data.append("ogg", '');
        data.append ("file", event.target.files[0]);
        console.log('FormData:', event.target.files[0]);

        var random = getRandomArbitrary(0, 999);
        var thas = this;
        var avatar = thas.props.auth.avatar;
        var nombre = thas.props.auth.nombres;
        var type = event.target.files[0].type;

        function typeImage(image){
			if((image=='image/gif') || (image=='image/png') || (image=='image/jpeg') || (image=='image/png') || (image=='application/x-shockwave-flash') || (image=='image/psd') || (image=='image/bmp') || (image=='image/tiff') || (image=='image/tiff') || (image=='application/octet-stream')|| (image=='	image/jp2') || (image=='application/octet-stream') || (image=='image/iff') || (image=='image/vnd.wap.wbmp') || (image=='image/xbm') || (image=='image/vnd.microsoft.icon')){
				return true;
			}else{
				return false;
			}
		}

        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function prerendeImg(path){
            var str = `<li class="right">
                        <div class="conversation-list">
                        <div class="chat-avatar">
                            <img src="${avatar}" alt="avatar"/>
                        </div>
                        <div class="user-chat-content">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content">
                                    <ul class="list-inline message-img  mb-0">                                            
                                        <li key="li_${random}"  class="list-inline-item message-img-list">
                                            <div id="div_messa_img_${random}"  class="bloqueodiv">
                                                <a class="popup-img d-inline-block m-1" href="/#" title="Project 1">
                                                <img src="${path}" alt="imagen" class="rounded border"/>
                                                </a>
                                            </div>
                                            <div class="message-img-link" id="options_${random}">
                                                <ul id="ul_options1_${random}" class="list-inline mb-0">
                                                    <li key="${random+1}" class="list-inline-item align-items-center">
                                                        <b class="text-danger">Cargando ...</b>
                                                    </li>
                                                </ul>
                                                <ul id="ul_options2_${random}" class="list-inline mb-0" style="display:none;">
                                                    <li key="${random}" class="list-inline-item">
                                                        <a href="${path}" download="archivo">
                                                            <i class="ri-download-2-line"></i>                                                            
                                                        </a>
                                                    </li>
                                                    <li key="${random}" class="list-inline-item dropdown">
                                                        <a class="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <a class="dropdown-item" href="/#">Copy <i class="ri-file-copy-line float-right text-muted"></i></a>
                                                            <a class="dropdown-item" href="/#">Save <i class="ri-save-line float-right text-muted"></i></a>
                                                            <a class="dropdown-item" href="/#">Forward <i class="ri-chat-forward-line float-right text-muted"></i></a>
                                                            <a class="dropdown-item" href="/#">Delete <i class="ri-delete-bin-line float-right text-muted"></i></a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>                                            
                                    </ul>
                                <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">10:09</span></p>
                            </div>
    
                            <div class="dropdown align-self-start">
                                <a class="dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="ri-more-2-fill"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="/#">Copy <i class="ri-file-copy-line float-right text-muted"></i></a>
                                    <a class="dropdown-item" href="/#">Save <i class="ri-save-line float-right text-muted"></i></a>
                                    <a class="dropdown-item" href="/#">Forward <i class="ri-chat-forward-line float-right text-muted"></i></a>
                                    <a class="dropdown-item" href="/#">Delete <i class="ri-delete-bin-line float-right text-muted"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="conversation-name">${nombre}</div>
                    </div>
                </div> 
            </li>`;
            
            return str;
        }

        if (event.target.files && event.target.files[0]) {  
            if(typeImage(type) == true){        
                var reader = new FileReader();
                reader.onload = function (e) {
                    var src = prerendeImg(e.target.result);
                    $("#chat-conversation-list").append(src); 
                    setTimeout(function(){
                        var scroll = document.querySelector('#chat-conversation .simplebar-content-wrapper');
                        $('#chat-conversation .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 800 );
                    }, 100); 
                };
                reader.readAsDataURL(event.target.files[0]);
            }else{
                var str = '<li class="right" style="list-style:none;">'+
                                        '<div class="conversation-list">'+
                                            '<div class="user-chat-content">'+                                            
                                                '<div class="ctext-wrap">'+
                                                    '<div class="ctext-wrap-content">'+                                                     
                                                        '<p class="mb-0"> archivo</p>'+                                                                                                 
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</li>'; 
                $("#chat-conversation-list").append(str);  
            }
        }

        axios.post(API.urlApi+'sendMessageFile', data, headers).then(response => {   
            if(response.data.res){
                console.log('go:', response.data);
                $("#div_messa_img_"+random).removeClass('bloqueodiv'); 
                $("#ul_options1_"+random).hide(100); 
                $("#ul_options2_"+random).show(100); 
            }else{
                console.log('no:', response.data);
            }    
        }).catch(error => {
            console.log('Error 0001x Send form file', error);
        });
    }

    preRender =()=>{ 
        return (<>
            <div id="contentEmoji" className="emojiContent" style={{display:'none'}}>
                <Picker
                onEmojiClick={this.onEmojiClick}
                disableAutoFocus={true}
                skinTone={SKIN_TONE_MEDIUM_DARK}
                groupNames={{ smileys_people: "PEOPLE" }}
                native
                />
            </div>
            <form onSubmit={this.props.callbackHandleSubmit}>
            
                <div className="p-3 p-lg-4 border-top mb-0 content-textarea">                        
                    <div className="row no-gutters">                                    
                        <div className="col">
                            <div>
                                <input type="hidden" name="emisor_id" id="emisor_id" />
                                <input type="hidden" name="receptor_id" id="receptor_id" />                                            
                                <input type="hidden" name="chat_id" id="chat_id" />                           
                                <ReactQuill
                                        ref={(el) => { this.reactQuillRef = el }}
                                        className="cke_editable bg-light border-light input-send-message textarea"
                                        theme="bubble"
                                        value={this.props.parent.emojiTextoValue}
                                        onChange={this.handleChange}
                                        onBlur={this.props.callbackCloseEmjoi}
                                        placeholder={"Escribir aqui ..."}
                                />
                                {/*<div contentEditable={true} id="message" className="textarea_like_whatsapp bg-light border-light input-send-message" data-text="Type something...">       
                                </div>
                                <input type="text" name="mensaje" id="mensaje" className="form-control form-control-lg bg-light border-light input-send-message" onChange={this.props.callbackHandleSendMessage} placeholder="Enter Message..."/>
                                <textarea name="mensaje" id="mensaje" className="form-control form-control-lg bg-light border-light input-send-message" onChange={this.props.callbackHandleSendMessage}></textarea>*/}
                            </div>
                        </div>
                        
                        <div className="col-auto">                       
                            <div className="chat-input-links ml-md-2">
                                <ul className="list-inline mb-0">
                                    <li key="1" className="list-inline-item">
                                        <button type="button" onClick={(e)=>{this.showViewEmoji(e)}} id="emojioneArea" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-toggle="tooltip" data-placement="top" title="Emoji">
                                            <i className="ri-emotion-happy-line fa-1x"></i>
                                        </button>
                                    </li>
                                    <li key="2" className="list-inline-item">                                    
                                        <a href="/#" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-toggle="tooltip" data-placement="top" title="Attached File">
                                            <input onChange={(event)=>{this.handleUpload(event)}} name="inputfile" type="file"/> 
                                            <i id="sendFile" className="ri-attachment-line fa-1x"></i>
                                        </a>
                                    </li>
                                    <li key="3" className="list-inline-item">                                                      
                                        <a href="/#" className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light btn-audio" >
                                            <div id="div-btn-send-audio" className="pb-3 mb-3 pr-4 mr-2 ml-0 pl-0">                                                
                                                <div className="microphoneStop noactivem" id="microphoneStop">
                                                    <i className="fa fa-microphone-slash"></i>
                                                    <div className="decibel" id="microphoneStopbar"></div>
                                                </div>
                                                <div className="microphone" id="microphone">
                                                    <i className="material-icons">keyboard_voice</i>
                                                    <div className="decibel" id="microphonebar"></div>
                                                </div>
                                            </div> 
                                        </a>
                                        <button type="submit" onSubmit={this.props.callbackHandleSubmit} className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light btn-text noactivem">
                                            <i className="ri-send-plane-2-fill"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>                                    
                        </div>                                
                    </div>                        
                </div>
            </form>
        </>);
    }

    render(){
        return (this.preRender());
    }
}

export default BtnSendAudio;