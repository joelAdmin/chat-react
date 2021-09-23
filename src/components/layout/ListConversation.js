import React, {Component} from 'react';
import {HTML} from '../lib/Lib';
class ListConversation extends Component{

    /*constructor(props){
        super(props);
    }*/

    componentDidMount(){
      
    }

    componentDidUpdate(){
       
    }

    conversation=()=>{
        return (                        
            <li key={this.props.values.mensaje_id} className={(this.props.values.receptor_id !== this.props.auth.usuario_id)?'right':''}>
                <div className="conversation-list">
                    <div className="chat-avatar">
                        <img src={this.props.values.avatar_emisor} alt="" />
                    </div>

                    <div className="user-chat-content">
                        <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                                <div className="mb-0"><p></p>
                                {HTML(this.props.values.mensaje)}
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
                                    <a className="dropdown-item" href="/#">Copy <i className="ri-file-copy-line float-right text-muted"></i></a>
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


    render(){
        return(this.conversation());
    }
}
export default ListConversation;