import React, {Component} from "react";
//import axios from "axios";
//import {API, IMG, TIMERMESSAGE, headers} from '../lib/Lib';
import ListChatMaster from './useListChatMaster.js';

class ChatOpenMaster extends Component {

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
                        <h5 className="mb-3 px-3 font-size-16">Recientes MASTER</h5>
                        <div className="chat-message-list" data-simplebar>
                            <ul className="list-unstyled chat-list chat-user-list">
                               <ListChatMaster auth={this.props.auth} />
                            </ul>
                        </div>

                    </div>
                    {/* End chat-message-list */}
                </div>
        );
    }
}

export default ChatOpenMaster;