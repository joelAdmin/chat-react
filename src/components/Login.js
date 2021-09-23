import React, { Component } from 'react';
import '../assets/css/login.css';
import axios from 'axios';
import Alert from './bootstrap/Alert.js';
import {validator, API} from './lib/Lib';

class Login extends Component {

    state = ({
        form:{
            email:'',
            password:''
        },
        error:false,
        errorMessage:'',
        title:'',
        theme:'alert-danger'
    });

    handleChange = async (event) =>{
        await this.setState({
            form:{
                ...this.state.form,
                [event.target.name]:event.target.value
            }
        });
    }


    getMessage =(message)=> {
        this.setState({
            error:true,
            errorMessage: message
        });                
        setTimeout(()=>{
            this.setState({error:false});
        }, 5000);  
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log('enviando');
        axios.post(API.urlApi+'login', this.state.form).then(response => {            
            if(response.data.res){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('usuario_id', response.data.user.usuario_id);
                window.location.href = '/';
            }else{
                validator(response.data.errors, '.loginForm')
                if(response.data.message){                
                   this.getMessage(response.data.message) 
                }   
            }        
        }).catch(error => {
            console.log('Error 0001x Send form', error);
        });        
    }

    render(){
        return (
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">                
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row"> 
                                    <img src="https://i.imgur.com/CXQmsmF.png" className="logoLogin" alt=""/> 
                                </div>
                                <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> 
                                    <img src="https://i.imgur.com/uNGdWHi.png" className="imageLogin" alt=""/> 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card2 card border-0 px-4 py-5">
                                <form className="loginForm" onSubmit={this.handleSubmit} >
                                    <div className="row mb-4 px-3">
                                        <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                        <div className="facebook text-center mr-3">
                                            <div className="fa fa-facebook"></div>
                                        </div>
                                        <div className="twitter text-center mr-3">
                                            <div className="fa fa-twitter"></div>
                                        </div>
                                        <div className="linkedin text-center mr-3">
                                            <div className="fa fa-linkedin"></div>
                                        </div>
                                    </div>
                                    <div className="row px-3 mb-4">
                                        <div className="line"></div> 
                                        <small className="or text-center">Or</small>
                                        <div className="line"></div>
                                    </div>
                                    {this.state.error === true &&
                                        <Alert theme={this.state.theme} show={this.state.error} title={this.state.title} message={this.state.errorMessage} />
                                    }
                                    
                                    <div className="row px-3"> 
                                        <label  htmlFor="firname" className="mb-1">
                                            <h6 className="mb-0 text-sm">Email Address</h6>
                                        </label> 
                                        <input className="mb-0" type="text" name="email" placeholder="Enter a valid email address" onChange={this.handleChange} /> 
                                        <span id="error_email" className="email text-danger mt-0 mb-2"></span>
                                    </div>
                                    <div className="row px-3"> 
                                        <label htmlFor="firstName" className="mb-1 mt-4">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label> 
                                        <input type="password" name="password" placeholder="Enter password" onChange={this.handleChange} /> 
                                    </div>
                                    <div className="row px-3 mb-4">
                                        <div className="custom-control custom-checkbox custom-control-inline"> 
                                            {/*<input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> 
                                            <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> */}
                                        </div>  <span id="error_password" className="password text-danger mt-0 mb-2"></span>
                                        <a href="/#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                                    </div>
                                    <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                                    <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <a href="/#" className="text-danger ">Register</a></small> </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue py-4">
                        <div className="row px-3"> <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                            <div className="social-contact ml-4 ml-sm-auto"> <span className="fa fa-facebook mr-4 text-sm"></span> <span className="fa fa-google-plus mr-4 text-sm"></span> <span className="fa fa-linkedin mr-4 text-sm"></span> <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;