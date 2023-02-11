import React, {useEffect, useState} from 'react';
import '../assets/css/login.css';
import axios from 'axios';
import Alert from './bootstrap/Alert.js';
import {validator, API, cookies} from './lib/Lib';

 const Login = (props) => {

    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('alert-danger');

    const handleSubmitLista = () => {}

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
                cookies.set('token', response.data.token, { path: '/' });
                cookies.set('usuario_id', response.data.user.usuario_id, { path: '/' });
               
                window.location.href = '/';
            }else{
                /**
                 * en caso de no tener respuesta muestro los mensajes 
                 * de error que vienen en el objeto response.data
                 * donde @property {data.errors} contiene los errores de los inpust generados 
                 * desde la configuración del modelo y @property {data.message} es un mensaje 
                 * personalizado en caso de no ingresar los credenciales correctos.
                 */

                validator(response.data.errors, '.loginForm');
                if(response.data.message){                
                   getMessage(response.data.message);
                }   
            }        
        }).catch(error => {
            console.log('Error 0001x Send form', error);
        });        
    }

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
        </div>
    );
}

export default Login;