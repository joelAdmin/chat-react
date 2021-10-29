import React, {Component} from 'react';
import Logout from './Logout.js';
import {IMG} from '../lib/Lib';

class SidebarMenu extends Component{

    state = ({
        token:localStorage.getItem('token'),
    });

    sidebarMenu=()=>{
        return (
        <div onClick={this.props.callbackCloseEmjoi} className="side-menu flex-lg-column mr-lg-1">
            {/* LOGO */}
            <div className="navbar-brand-box">
                <a href="index.html" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src="assets/images/logo.svg" alt="" height="30" />
                    </span>
                </a>

                <a href="index.html" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="assets/images/logo.svg" alt="" height="30"/>
                    </span>
                </a>
            </div>
            {/* end navbar-brand-box */}

            {/* Start side-menu nav */}
            <div className="flex-lg-column my-auto">
                <ul className="nav nav-pills side-menu-nav justify-content-center" role="tablist">
                    <li className="nav-item" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Profile">
                        <a className="nav-link" id="pills-user-tab" data-toggle="pill" href="#pills-user" role="tab">
                            <i className="ri-user-2-line"></i>
                        </a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Chats">
                        <a className="nav-link active" id="pills-chat-tab" data-toggle="pill" href="#pills-chat" role="tab">
                            <i className="ri-message-3-line"></i>
                        </a>
                    </li>
                    {/*
                    <li className="nav-item" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Groups">
                        <a className="nav-link" id="pills-groups-tab" data-toggle="pill" href="#pills-groups" role="tab">
                            <i className="ri-group-line"></i>
                        </a>
                    </li>
                    */}
                    <li className="nav-item" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Contacts">
                        <a className="nav-link" id="pills-contacts-tab" data-toggle="pill" href="#pills-contacts" role="tab">
                            <i className="ri-contacts-line"></i>
                        </a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-trigger="hover" data-placement="top" title="Settings">
                        <a className="nav-link" id="pills-setting-tab" data-toggle="pill" href="#pills-setting" role="tab">
                            <i className="ri-settings-2-line"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
                        <a className="nav-link dropdown-toggle" href="/#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={this.props.auth.avatar !== '' ? this.props.auth.avatar : IMG} alt="" className="profile-user rounded-circle"/>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/#">Perfil <i className="ri-profile-line float-right text-muted"></i></a>
                            <a className="dropdown-item" href="/#">Config. <i className="ri-settings-3-line float-right text-muted"></i></a>
                            <div className="dropdown-divider"></div>
                            <Logout></Logout>
                        </div>
                    </li>
                </ul>
            </div>
            {/* end side-menu nav */}

            <div className="flex-lg-column d-none d-lg-block">
                <ul className="nav side-menu-nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link" id="light-dark" href="/#" data-toggle="tooltip" data-trigger="hover" data-placement="right" title="Dark / Light Mode">
                            <i className="ri-sun-line theme-mode-icon"></i>
                        </a>
                    </li>

                    <li className="nav-item btn-group dropup profile-user-dropdown">
                        <a href="/#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown"  aria-expanded="false">
                            <img src={this.props.auth.avatar !== '' ? this.props.auth.avatar : IMG} alt="" className="profile-user rounded-circle"/>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="/#">Perfil <i className="ri-profile-line float-right text-muted"></i></a>
                            <a className="dropdown-item" href="/#">Config. <i className="ri-settings-3-line float-right text-muted"></i></a>
                            <div className="dropdown-divider"></div>
                            <Logout></Logout>
                        </div>
                    </li>
                </ul>
            </div>
            {/* Side menu user */}
        </div>
        );
    }

    render(){
        return(this.sidebarMenu());
    }
}
export default SidebarMenu;