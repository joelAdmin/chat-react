import React, {useEffect, useState} from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';

import '../assets/css/login.css';
import axios from 'axios';
import Alert from './bootstrap/Alert.js';
import {validator, API, cookies, headers, headersBlod, headersBlodLogin, getErrorAxios, logout} from './lib/Lib';

import {setLogin} from '../features/user/authSlice';
import {openChat, getChatsUser, getChatsMaster, getSubChatsMaster} from '../features/user/chatSlice';

import {getChatsU as getApiChatsU, getChatsM as getApiChatsM} from './helpers/Chat';
import {SpinnerLoading as SpinnerLoad} from './helpers/SpinnerLoading';

 const Login = (props) => {

    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('alert-danger');

    const navigate = useNavigate();
    const estado = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmitLista = () => {}

    useEffect(()=>{
        console.log('iniciando login');
        if(typeof cookies.get('token') == 'undefined')
		{
            console.log('limpiando store login');
            cookies.remove('usuario_id', {path: "/"});
            cookies.remove('token', {path: "/"});   
            localStorage.clear(); 
        }else{
            return navigate('/'); 
        }
    }, []);

    /**
    * Actualizar el valor de los inputs
    * @param {*} event 
    */
    const handleChange = async (event) =>{
       await setForm({...form, [event.target.name]:event.target.value,});
    }


    /**
     * Función encargada de actualizar las variables
     * de estado de error para ser enviadas como props en 
     * el componente @class Alert
     * @param {*} message mensaje a mostrar
     */
    const getMessage = (message) => {
        setError(true);
        setErrorMessage(message);

        setTimeout(()=>{
            setError(false);
        }, 5000);
    }

     /**
     * Función que consulta el recurso login de la api  
     * pasando las variables de estados para validar la
     * sesión del usuario
     * @param {*} event para evitar recargar la pagina
     */
     const handleSubmit = (event) => {
        event.preventDefault();
        
        //defini mi disparador de redux toolkit
        //const dispatch = useDispatch();

        axios.post(process.env.REACT_APP_URL_API+'login', form).then(response => {            
            if(response.data.res){
                /**
                 * si obtendo una respuesta creo las cookies 
                 * con el token de sesiòn y redirecciono a /
                 */
                //console.log(response);
                cookies.set('token', response.data.token, { path: '/' });
                cookies.set('usuario_id', response.data.user.usuario_id, { path: '/' });

                dispatch(setLogin({
                    access:response.data.access,
                    userAuth:response.data.user
                }));

                if(response.data.access == 'Mg==')
                {
                    console.log('Es un usuario cliente');
                    console.log(response);
                    axios.get(process.env.REACT_APP_URL_API+'chatsAuthU/'+response.data.user.usuario_id, {
                        headers: {
                          responseType: 'blob',
                          accept: 'application/json',
                          Authorization: 'Bearer '+response.data.token
                        },
                        data: {},
                    }).then(resp => {  
                        dispatch(getChatsUser(resp.data.result));
                        navigate("/", {
                            state:{
                                chats:resp.data.result, 
                                access: response.data.access, 
                                userAuth: response.data.user 
                            }
                        })
                    }).catch(function (error) {
                        console.log(error);
                    })
                    /*getApiChatsU(response.data.user.usuario_id).then(resp => {
                        dispatch(getChatsUser(resp.result));
                    });*/
                }else if(response.data.access == 'MA==')
                {
                    console.log('Es un usuario manager');
                    axios.get(process.env.REACT_APP_URL_API+'chatsAuthM/'+response.data.user.usuario_id, {
                        headers: {
                          responseType: 'blob',
                          accept: 'application/json',
                          Authorization: 'Bearer '+response.data.token
                        },
                        data: {},
                    }).then(resp => {  
                        console.log(resp);
                        dispatch(getChatsMaster(resp.data.result));
                        navigate("/", {
                            state:{
                                chats:resp.data.result, 
                                access: response.data.access, 
                                userAuth: response.data.user 
                            }
                        }); 
                        // lo redireccionamos
                        {/*<Navigate to="/home" state={response.data.user}/>*/}
                    }).catch(function (error) {
                        //getErrorAxios();
                        cookies.remove('usuario_id', {path: "/"});
                        cookies.remove('token', {path: "/"});
                        console.log(error);
                    })
                }

            }else{
                /**
                 * en caso de no tener respuesta muestro los mensajes 
                 * de error que vienen en el objeto response.data
                 * donde @property {data.errors} contiene los errores de los inpust generados 
                 * desde la configuración del modelo y @property {data.message} es un mensaje 
                 * personalizado en caso de no ingresar los credenciales correctos.
                 */
                console.log('validando errores de inicio de sesion');
                validator(response.data.errors, '.loginForm');
                if(response.data.message){       
                    console.log('validando errores de inicio de sesion 3');         
                    getMessage(response.data.message);
                }   
            }        
        }).catch(error => {
            console.log('Error 0001x Send form', error);
        });        
    }

    return (typeof cookies.get('token') == 'undefined' ?
        (<div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">                
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
                            {/* En el formulario asociamos el evento onSubmit
                            con la funcion handleSubmit() que consume 
                            el recurso login para validar los datos de inicio de sesion
                            en el backend */}
                            <form className="loginForm" onSubmit={handleSubmit} >
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

                                {error  &&
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}!
                                    </div>
                                }

                                {/* validamos si la variable de estado de error es verdadera
                                 para mostrar mensaje de error haciendo uso del componente Alert */}
                                 {/*
                                {this.state.error === true &&
                                    <Alert theme={this.state.theme} show={this.state.error} title={this.state.title} message={this.state.errorMessage} />
                                }*/}
                                
                                <div className="row px-3"> 
                                    <label  htmlFor="firname" className="mb-1">
                                        <h6 className="mb-0 text-sm">Email Address</h6>
                                    </label> 
                                    {/* En los input del formulario asociamos el evento onChange
                                        con la funcion handleChange() que consume 
                                        que se mantiene escuchado las actualizaciones de los inputs
                                     */}
                                    <input className="mb-0" type="text" name="email" placeholder="Enter a valid email address" onChange={handleChange} /> 
                                    <span id="error_email" className="email text-danger mt-0 mb-2"></span>
                                </div>
                                <div className="row px-3"> 
                                    <label htmlFor="firstName" className="mb-1 mt-4">
                                        <h6 className="mb-0 text-sm">Password</h6>
                                    </label> 
                                    <input type="password" name="password" placeholder="Enter password" onChange={handleChange} /> 
                                </div>
                                <div className="row px-3 mb-4">
                                    <div className="custom-control custom-checkbox custom-control-inline"> 
                                        {/*<input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> 
                                        <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> */}
                                    </div>  <span id="error_password" className="password text-danger mt-0 mb-2"></span>
                                    <a href="/#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                                </div>
                                <div className="row mb-3 px-3"> <button type="submit" className="btn btn-blue text-center">Login</button> </div>
                                <div className="row mb-4 px-3"> <small className="font-weight-bold">Dont have an account? <a href="/#" onClick={handleSubmitLista} className="text-danger ">Register</a></small> </div>
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
        </div>):
        (<> <SpinnerLoad /></>)
    );
}

export default Login;