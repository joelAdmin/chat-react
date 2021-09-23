import React, {Component} from 'react';
import ListConversation from './ListConversation.js';
import ListConversationFile from './ListConversationFile.js';

import $ from 'jquery';

class Conversation extends Component{

    constructor(props){
        super(props);
        this.state ={}
    }

    componentDidMount(){
        document.getElementById('loading').innerHTML='';
    }

    componentDidUpdate(){
        this.topScroll();
    }

    topScroll =()=>{
       
        if(this.props.conversations.length > 0){
            setTimeout(function(){
                var scroll = document.querySelector('#chat .simplebar-content-wrapper');
                $('#chat .simplebar-content-wrapper').animate( {scrollTop : scroll.scrollHeight}, 900 );
            }, 300);
        }
    }

    conversation=()=>{
        return (            
            <div className="user-chat w-100">
                <div className="d-lg-flex">
                    {/* start chat conversation section */}
                    <div className="w-100">
                        <div className="p-3 p-lg-4 border-bottom">
                            <div className="row align-items-center">
                                <div className="col-sm-4 col-8">
                                    <div className="media align-items-center">
                                        <div className="d-block d-lg-none mr-2">
                                            <a href="/#"    className="user-chat-remove text-muted font-size-16 p-2"><i className="ri-arrow-left-s-line"></i></a>
                                        </div>
                                        <div className="mr-3">
                                            <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" alt="" />
                                        </div>
                                        <div className="media-body overflow-hidden">
                                            <h5 className="font-size-16 mb-0 text-truncate"><a href="/#"    className="text-reset user-profile-show">Doris Brown</a> <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i></h5>
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
                        </div>
                        {/* end chat user head */}

                        {/* start chat conversation */}
                        {this.props.conversations.length > 0 &&
                            <div id="chat" className="chat-conversation p-3 p-lg-4" data-simplebar="init">
                                <ul className="list-unstyled mb-0">  
                                {/* 
                                    {Object.values(this.props.conversations).map((values, key) => {
                                        if(values.ogg === null){
                                            if(values.attachment === 0){
                                                return <ListConversation key={key} values={values} {...this.props} />
                                            }else if(values.attachment === 1){
                                                return <ListConversationFile values={values} {...this.props} />
                                            }
                                        }else{
                                            return <audio controls><track kind="captions"></track>  <source src={values.ogg} type="audio/wav"/> </audio>                                                                                           
                                        }
                                    } )}*/}
                                     {Object.values(this.props.conversations).map((values, key) => {
                                        if(values.ogg === null){
                                            if(values.attachment === 0){
                                                return <ListConversation {...key} values={values} {...this.props} />
                                            }else{
                                                return <ListConversationFile {...key} values={values} {...this.props} />
                                            }
                                        }else{
                                            return <audio controls><track kind="captions"></track>  <source src={values.ogg} type="audio/wav"/> </audio>                                                                                           
                                        }
                                    } )}
                                </ul>
                            </div>                            
                        }

                        {this.props.conversations.length < 1 &&
                             <div className="chat-conversation p-3 p-lg-4" data-simplebar="init">
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
                        <div className="p-3 p-lg-4 border-top mb-0">
                            <div className="row no-gutters">
                                <div className="col">
                                    <div>
                                        <input type="text" className="form-control form-control-lg bg-light border-light" placeholder="Enter Message..."/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="chat-input-links ml-md-2">
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <button type="button" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-toggle="tooltip" data-placement="top" title="Emoji">
                                                    <i className="ri-emotion-happy-line"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item">  
                                                <button type="button" className="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect" data-toggle="tooltip" data-placement="top" title="Attached File">
                                                    <i className="ri-attachment-line"></i>
                                                </button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button type="submit" className="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light">
                                                    <i className="ri-send-plane-2-fill"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
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
                                <img src="assets/images/users/avatar-4.jpg" className="rounded-circle avatar-lg img-thumbnail" alt="" />
                            </div>

                            <h5 className="font-size-16 mb-1 text-truncate">Doris Brown</h5>
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
                                                <h5 className="font-size-14">Doris Brown</h5>
                                            </div>

                                            <div className="mt-4">
                                                <p className="text-muted mb-1">Email</p>
                                                <h5 className="font-size-14">adc@123.com</h5>
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

                                <div className="card mb-1 shadow-none border">
                                    <a href="#collapseTwo" className="text-dark collapsed" data-toggle="collapse"
                                                    aria-expanded="false"
                                                    aria-controls="collapseTwo">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="font-size-14 m-0">
                                                <i className="ri-attachment-line mr-2 align-middle d-inline-block"></i> Attached Files
                                                <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                            </h5>
                                        </div>
                                    </a>
                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                            data-parent="#profile-user-accordion">
                                        <div className="card-body">
                                            <div className="card p-2 border mb-2">
                                                <div className="media align-items-center">
                                                    <div className="avatar-sm mr-3">
                                                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                            <i className="ri-file-text-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="text-left">
                                                            <h5 className="font-size-14 mb-1">admin_v1.0.zip</h5>
                                                            <p className="text-muted font-size-13 mb-0">12.5 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-4">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="/#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="/#">Action</a>
                                                                    <a className="dropdown-item" href="/#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="/#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card */}

                                            <div className="card p-2 border mb-2">
                                                <div className="media align-items-center">
                                                    <div className="avatar-sm mr-3">
                                                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                            <i className="ri-image-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="text-left">
                                                            <h5 className="font-size-14 mb-1">Image-1.jpg</h5>
                                                            <p className="text-muted font-size-13 mb-0">4.2 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-4">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="/#"    className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="/#">Action</a>
                                                                    <a className="dropdown-item" href="/#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="/#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card */}

                                            <div className="card p-2 border mb-2">
                                                <div className="media align-items-center">
                                                    <div className="avatar-sm mr-3">
                                                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                            <i className="ri-image-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="text-left">
                                                            <h5 className="font-size-14 mb-1">Image-2.jpg</h5>
                                                            <p className="text-muted font-size-13 mb-0">3.1 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-4">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="/#"    className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="/#">Action</a>
                                                                    <a className="dropdown-item" href="/#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="/#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card */}

                                            <div className="card p-2 border mb-2">
                                                <div className="media align-items-center">
                                                    <div className="avatar-sm mr-3">
                                                        <div className="avatar-title bg-soft-primary text-primary rounded font-size-20">
                                                            <i className="ri-file-text-fill"></i>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div className="text-left">
                                                            <h5 className="font-size-14 mb-1">Landing-A.zip</h5>
                                                            <p className="text-muted font-size-13 mb-0">6.7 MB</p>
                                                        </div>
                                                    </div>

                                                    <div className="ml-4">
                                                        <ul className="list-inline mb-0 font-size-18">
                                                            <li className="list-inline-item">
                                                                <a href="/#" className="text-muted px-1">
                                                                    <i className="ri-download-2-line"></i>
                                                                </a>
                                                            </li>
                                                            <li className="list-inline-item dropdown">
                                                                <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="ri-more-fill"></i>
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="/#">Action</a>
                                                                    <a className="dropdown-item" href="/#">Another action</a>
                                                                    <div className="dropdown-divider"></div>
                                                                    <a className="dropdown-item" href="/#">Delete</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card */}

                                        </div>
                        
                                    </div>
                                </div>
                                {/* End Attached Files card */}
                            </div>
                            {/* end profile-user-accordion */}
                        </div>
                        {/* end user-profile-desc */}
                    </div>
                    {/* end User profile detail sidebar */}
                </div>
            </div>
        );
    }


    render(){
        return(this.conversation());
    }
}
export default Conversation;