import React, {Component} from "react";
import {IMG} from '../lib/Lib';
import $ from 'jquery';
class HeadChatOpen extends Component {

    handleShowViewUserTo = () => {
        if($('#to-user-profile-sidebar').css('display')=='none'){
            $('#to-user-profile-sidebar').show(200);
        }else{
            $('#to-user-profile-sidebar').hide(200);
        }
    }

    render(){return(
        <React.Fragment>
            {this.props.conversations.length > 0 &&                    
            <div className="row align-items-center">
                <div className="col-sm-4 col-8">
                    <div className="media align-items-center">
                        <div className="d-block d-lg-none mr-2">
                            <a href="/#"  className="user-chat-remove text-muted font-size-16 p-2"><i className="ri-arrow-left-s-line"></i></a>
                        </div>
                        <div className="mr-3">
                            {Object(this.props.userTo).nombre !== 'undefined' &&
                                <img src={(Object(this.props.userTo).avatar !== null) ? Object(this.props.userTo).avatar : IMG} className="rounded-circle avatar-xs" alt="" />
                            }                                            
                        </div>
                        <div className="media-body overflow-hidden">{this.props.parent.openchat===true && <b>gggggg</b>}
                            <h5  className="font-size-16 mb-0 text-truncate">
                                <a href="/#" title="Perfil" onClick={this.handleShowViewUserTo} className="text-reset user-profile-show userToProfileShow">
                                    {Object(this.props.userTo).nombre} {Object(this.props.userTo).apellido}
                                </a> 
                                <i className="ri-record-circle-fill font-size-10 text-success d-inline-block ml-1"></i>
                            </h5>
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
        }
        </React.Fragment>
    )}
}
export default HeadChatOpen;