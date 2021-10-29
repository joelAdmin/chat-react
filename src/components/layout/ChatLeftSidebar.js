import React, {Component} from 'react';
import ChatOpenUser from './ChatOpenUser.js';
import ChatOpenMaster from './ChatOpenMaster.js';
import {IMG, DATE, HORA, LOCATION} from '../lib/Lib';

class ChatLeftSidebar extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isChecked: true,
          ishaspopup:true,
          date:DATE,
          hora:HORA,
        };
    }

    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
    }  
    
    render(){ 
        return (
            <div onClick={this.props.callbackCloseEmjoi} className="chat-leftsidebar mr-lg-1">

                <div className="tab-content">
                    {/* Start Profile tab-pane */}
                    <div className="tab-pane" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                        {/* Start profile content */}
                        <div>
                            <div className="px-4 pt-4">
                                <div className="user-chat-nav float-right">
                                    <div className="dropdown">
                                        <a href="/#"   className="font-size-18 text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                            <i className="ri-more-2-fill"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="/#"   >Editar </a>
                                            {/*
                                            <a className="dropdown-item" href="/#"   >Action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/#"   >Another action</a>
                                            */}
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mb-0">Mi Perfil</h4>
                            </div>

                            <div className="text-center p-4 border-bottom">
                                <div className="mb-4">
                                    <img src={this.props.auth.avatar !== '' ? this.props.auth.avatar : IMG} className="rounded-circle avatar-lg img-thumbnail" alt=""/>
                                </div>

                                <h5 className="font-size-16 mb-1 text-truncate">{this.props.auth.nombres} {this.props.auth.apellidos}</h5>
                                <p className="text-muted text-truncate mb-1">
                                    {this.props.auth.conectado === 1 ? <span><i className="ri-record-circle-fill font-size-10 text-success mr-1 d-inline-block"></i> Conectado</span> : <span><i className="ri-record-circle-fill font-size-10 text-danger mr-1 d-inline-block"></i> Desconectado</span>  }
                                </p>
                            </div>
                            {/* End profile user */}

                            {/* Start user-profile-desc */}
                            <div className="p-4 user-profile-desc" data-simplebar>
                                <div className="text-muted">
                                    <p className="mb-4">Sistema de Asesorias y consultas legales.</p>
                                </div>

                                <div id="profile-user-accordion-1" className="custom-accordion">
                                    <div className="card shadow-none border mb-2">
                                        <a href="#profile-user-collapseOne" className="text-dark" data-toggle="collapse"
                                                        aria-expanded="true"
                                                        aria-controls="profile-user-collapseOne">
                                            <div className="card-header" id="profile-user-headingOne">
                                                <h5 className="font-size-14 m-0">
                                                    <i className="ri-user-2-line mr-2 align-middle d-inline-block"></i> Cuenta
                                                    <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                                </h5>
                                            </div>
                                        </a>

                                        <div id="profile-user-collapseOne" className="collapse show"
                                                aria-labelledby="profile-user-headingOne" data-parent="#profile-user-accordion-1">
                                            <div className="card-body">

                                                <div>
                                                    <p className="text-muted mb-1">Nombre</p>
                                                    <h5 className="font-size-14">{this.props.auth.nombres} {this.props.auth.apellidos}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Email</p>
                                                    <h5 className="font-size-14">{this.props.auth.email}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Hora</p>
                                                    <h5 className="font-size-14">{this.state.hora}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Lugar</p>
                                                    <h5 className="font-size-14 mb-0">{LOCATION.city}, {LOCATION.country}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End About card */}

                                    <div className="card mb-1 shadow-none border">
                                        <a href="#profile-user-collapseTwo" className="text-dark collapsed" data-toggle="collapse"
                                                        aria-expanded="false"
                                                        aria-controls="profile-user-collapseTwo">
                                            <div className="card-header" id="profile-user-headingTwo">
                                                <h5 className="font-size-14 m-0">
                                                    <i className="ri-attachment-line mr-2 align-middle d-inline-block"></i> Archivos Adjuntos
                                                    <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                                </h5>
                                            </div>
                                        </a>
                                        <div id="profile-user-collapseTwo" className="collapse" aria-labelledby="profile-user-headingTwo"
                                                data-parent="#profile-user-accordion-1">
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
                                                                <h5 className="font-size-14 mb-1">Admin-A.zip</h5>
                                                                <p className="text-muted font-size-13 mb-0">12.5 MB</p>
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
                                                                    <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown"  aria-expanded="false">
                                                                        <i className="ri-more-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="/#"   >Action</a>
                                                                        <a className="dropdown-item" href="/#"   >Another action</a>
                                                                        <div className="dropdown-divider"></div>
                                                                        <a className="dropdown-item" href="/#"   >Delete</a>
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
                                                                    <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown"  aria-expanded="false">
                                                                        <i className="ri-more-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="/#"   >Action</a>
                                                                        <a className="dropdown-item" href="/#"   >Another action</a>
                                                                        <div className="dropdown-divider"></div>
                                                                        <a className="dropdown-item" href="/#"   >Delete</a>
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
                                                                    <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown"  aria-expanded="false">
                                                                        <i className="ri-more-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="/#"   >Action</a>
                                                                        <a className="dropdown-item" href="/#"   >Another action</a>
                                                                        <div className="dropdown-divider"></div>
                                                                        <a className="dropdown-item" href="/#"   >Delete</a>
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
                                                                    <a href="/#"    className="text-muted px-1">
                                                                        <i className="ri-download-2-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li className="list-inline-item dropdown">
                                                                    <a className="dropdown-toggle text-muted px-1" href="/#"    role="button" data-toggle="dropdown"  aria-expanded="false">
                                                                        <i className="ri-more-fill"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="/#"   >Action</a>
                                                                        <a className="dropdown-item" href="/#"   >Another action</a>
                                                                        <div className="dropdown-divider"></div>
                                                                        <a className="dropdown-item" href="/#"   >Delete</a>
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
                        {/* End profile content */}
                    </div>
                    {/* End Profile tab-pane */}

                    {/* Start chats tab-pane */}
                    <div className="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                        {/* Start chats content */}
                        {this.props.access === 'Mg==' ?  <ChatOpenUser parent={this.props} /> : <ChatOpenMaster parent={this.props} auth={this.props.auth} />}                        
                        {/* Start chats content */}
                    </div>
                    {/* End chats tab-pane */}
                    
                    {/* Start groups tab-pane */}
                    <div className="tab-pane" id="pills-groups" role="tabpanel" aria-labelledby="pills-groups-tab">
                        
                    </div>
                    {/* End groups tab-pane */}

                    {/* Start contacts tab-pane */}
                    <div className="tab-pane" id="pills-contacts" role="tabpanel" aria-labelledby="pills-contacts-tab">
                        {/* Start Contact content */}
                        <div>
                            <div className="p-4">
                                <div className="user-chat-nav float-right">
                                    <div data-toggle="tooltip" data-placement="bottom" title="Add Contact">
                                        {/* Button trigger modal */}
                                        <button type="button" className="btn btn-link text-decoration-none text-muted font-size-18 py-0" data-toggle="modal" data-target="#addContact-exampleModal">
                                            <i className="ri-user-add-line"></i>
                                        </button>
                                    </div>
                                </div>
                                <h4 className="mb-4">Contacts</h4>

                                {/* Start Add contact Modal */}
                                <div className="modal fade" id="addContact-exampleModal" tabIndex={-1} role="dialog" aria-labelledby="addContact-exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title font-size-16" id="addContact-exampleModalLabel">Add Contact</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body p-4">
                                                <form>
                                                    <div className="form-group mb-4">
                                                        <label htmlFor="addcontactemail-input">Email</label>
                                                        <input type="email" className="form-control" id="addcontactemail-input" placeholder="Enter Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="addcontact-invitemessage-input">Invatation Message</label>
                                                        <textarea className="form-control" id="addcontact-invitemessage-input" rows="3" placeholder="Enter Message"></textarea>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-link" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary">Invite Contact</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Add contact Modal */}

                                <div className="search-box chat-search-box">
                                    <div className="input-group bg-light  input-group-lg rounded-lg">
                                        <div className="input-group-prepend">
                                            <button className="btn btn-link text-decoration-none text-muted pr-1" type="button">
                                                <i className="ri-search-line search-icon font-size-18"></i>
                                            </button>
                                        </div>
                                        <input type="text" className="form-control bg-light " placeholder="Search users.." />
                                    </div>
                                </div>
                                {/* End search-box */}
                            </div>
                            {/* end p-4 */}

                            {/* Start contact lists */}
                            <div className="p-4 chat-message-list chat-group-list" data-simplebar>
        
                                <div>
                                    <div className="p-3 font-weight-bold text-primary">
                                        A
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Albert Rodarte</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Allison Etter</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* end contact list A */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        C
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Craig Smiley</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* end contact list C */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        D
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Daniel Clay</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Doris Brown ..</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list D */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        I
                                    </div>

                                    <ul className="list-unstyled contact-list">
                
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Iris Wells</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* end contact list I */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        J
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Juan Flakes</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">John Hall</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Joy Southern</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {/* end contact list J */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        M
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Mary Farmer</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Mark Messer</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Michael Hinton</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list M */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        O
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Ossie Wilson</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list O */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        P
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Phillis Griffin</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Paul Haynes</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list P */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        R
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Rocky Jackson</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list R */}

                                <div className="mt-3">
                                    <div className="p-3 font-weight-bold text-primary">
                                        S
                                    </div>

                                    <ul className="list-unstyled contact-list">
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Sara Muller</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Simon Velez</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="media align-items-center">
                                                <div className="media-body">
                                                    <h5 className="font-size-14 m-0">Steve Walker</h5>
                                                </div>
                        
                                                <div className="dropdown">
                                                    <a href="/#"    className="text-muted dropdown-toggle" data-toggle="dropdown"  aria-expanded="false">
                                                        <i className="ri-more-2-fill"></i>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="/#"   >Share <i className="ri-share-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Block <i className="ri-forbid-line float-right text-muted"></i></a>
                                                        <a className="dropdown-item" href="/#"   >Remove <i className="ri-delete-bin-line float-right text-muted"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                                {/* end contact list S */}
                            </div>
                            {/* end contact lists */}
                        </div>
                        {/* Start Contact content */}
                    </div>
                    {/* End contacts tab-pane */}
                    
                    {/* Start settings tab-pane */}
                    <div className="tab-pane" id="pills-setting" role="tabpanel" aria-labelledby="pills-setting-tab">
                        {/* Start Settings content */}
                        <div>
                            <div className="px-4 pt-4">
                                <h4 className="mb-0">Configuración</h4>
                            </div>

                            <div className="text-center border-bottom p-4">
                                <div className="mb-4 profile-user">
                                    <img src={this.props.auth.avatar !== '' ? this.props.auth.avatar : IMG} className="rounded-circle avatar-lg img-thumbnail" alt=""/>
                                    <button type="button" className="btn bg-light avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <i className="ri-pencil-fill"></i>
                                    </button>
                                </div>

                                <h5 className="font-size-16 mb-1 text-truncate">{this.props.auth.nombres} {this.props.auth.apellidos}</h5>
                                <div className="dropdown d-inline-block mb-1">
                                    <a className="text-muted dropdown-toggle pb-1 d-block" href="/#"    role="button" data-toggle="dropdown"  aria-expanded="false">
                                    {this.props.auth.conectado !== 0 ? <span>Disponible <i className="mdi mdi-chevron-down"></i></span> : <span>Desconectado <i className="mdi mdi-chevron-down"></i></span>}  
                                    </a>
        
                                    <div className="dropdown-menu">
                                    <a className="dropdown-item" href="/#"   >Disponible</a>
                                    <a className="dropdown-item" href="/#"   >Desconectado</a>
                                    </div>
                                </div>
                            </div>
                            {/* End profile user */}

                            {/* Start User profile description */}
                            <div className="p-4 user-profile-desc" data-simplebar>        
                                <div id="profile-setting-accordion" className="custom-accordion">
                                    <div className="card shadow-none border mb-2">
                                        <a href="#profile-setting-personalinfocollapse" className="text-dark" data-toggle="collapse"
                                                        aria-expanded="true"
                                                        aria-controls="profile-setting-personalinfocollapse">
                                            <div className="card-header" id="profile-setting-personalinfoheading">
                                                <h5 className="font-size-14 m-0">
                                                    Información Personal
                                                    <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                                </h5>
                                            </div>
                                        </a>

                                        <div id="profile-setting-personalinfocollapse" className="collapse show"
                                                aria-labelledby="profile-setting-personalinfoheading" data-parent="#profile-setting-accordion">
                                            <div className="card-body">
                                                <div className="float-right">
                                                    <button type="button" className="btn btn-light btn-sm"><i className="ri-edit-fill mr-1 align-middle"></i> Editar</button>
                                                </div>

                                                <div>
                                                    <p className="text-muted mb-1">Nombre</p>
                                                    <h5 className="font-size-14">{this.props.auth.nombres} {this.props.auth.apellidos}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Email</p>
                                                    <h5 className="font-size-14">{this.props.auth.email}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Hora</p>
                                                    <h5 className="font-size-14">{this.state.hora}</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <p className="text-muted mb-1">Lugar</p>
                                                    <h5 className="font-size-14 mb-0">{LOCATION.city}, {LOCATION.country}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end profile card 
                                        
                                        end Privacy card 
                                    */}

                                    <div className="card shadow-none border mb-2">
                                        <a href="#profile-setting-securitynoticollapse" className="text-dark collapsed" data-toggle="collapse"
                                                        aria-expanded="false"
                                                        aria-controls="profile-setting-securitynoticollapse">
                                            <div className="card-header" id="profile-setting-securitynotiheading">
                                                <h5 className="font-size-14 m-0">
                                                    Securidad
                                                    <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                                </h5>
                                            </div>
                                        </a>
                                        <div id="profile-setting-securitynoticollapse" className="collapse" aria-labelledby="profile-setting-securitynotiheading"
                                                data-parent="#profile-setting-accordion">
                                            <div className="card-body">
                        
                                                <div>
                                                    <div className="media align-items-center">
                                                        <div className="media-body overflow-hidden">
                                                            <h5 className="font-size-13 mb-0 text-truncate">Show security notification</h5>

                                                        </div>
                                                        <div className="ml-2">
                                                            <div className="custom-control custom-switch">
                                                                <input type="checkbox" className="custom-control-input" id="security-notificationswitch" />
                                                                <label className="custom-control-label" htmlFor="security-notificationswitch">{false}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end Security card */}

                                    <div className="card shadow-none border mb-2">
                                        <a href="#profile-setting-helpcollapse" className="text-dark collapsed" data-toggle="collapse"
                                                        aria-expanded="false"
                                                        aria-controls="profile-setting-helpcollapse">
                                            <div className="card-header" id="profile-setting-helpheading">
                                                <h5 className="font-size-14 m-0">
                                                    Ayuda
                                                    <i className="mdi mdi-chevron-up float-right accor-plus-icon"></i>
                                                </h5>
                                            </div>
                                        </a>
                                        <div id="profile-setting-helpcollapse" className="collapse" aria-labelledby="profile-setting-helpheading"
                                                data-parent="#profile-setting-accordion">
                                            <div className="card-body">
                        
                                                <div>
                                                    <div className="py-3">
                                                        <h5 className="font-size-13 mb-0"><a href="/#"    className="text-body d-block">FAQs</a></h5>
                                                    </div>
                                                    <div className="py-3 border-top">
                                                        <h5 className="font-size-13 mb-0"><a href="/#"    className="text-body d-block">Contact</a></h5>
                                                    </div>
                                                    <div className="py-3 border-top">
                                                        <h5 className="font-size-13 mb-0"><a href="/#"    className="text-body d-block">Terms & Privacy policy</a></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* end Help card */}
                                </div>
                                {/* end profile-setting-accordion */}
                            </div>
                            {/* End User profile description */}
                        </div>
                        {/* Start Settings content */}
                    </div>
                    {/* End settings tab-pane */}
                </div>
                {/* end tab content */}

            </div>
        );
    }

    
}
export default ChatLeftSidebar;