//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import Base from './components/Base.js';
import Login from './components/Login';
import {isAuth, cookies, clearCookies} from './components/lib/Lib';  
import {getuserAuth} from './components/helpers/UserAuth';

//acceder a los hooks de redux toolkit para 
import {useDispatch} from 'react-redux';
//importar mis Slice definidos 
import {setLogin} from './features/user/loginSlice';

const App = () => {

  const dispatch = useDispatch();

  const addStoreInfoUser = () => {
    getuserAuth().then(response => {
      dispatch(setLogin({
        access:response.access,
        usuarioId:4,
        user:response.result
      }));      
    });	
  }

  useEffect(() => {
    loadRender()
    if(isAuth()){
      addStoreInfoUser()
    }
  }, []);	
  
  /**
   * @param params contiene todas las props
   * @returns componete base con cada una de las
   *  partes que conforma el app plantilla
   */
  
  const base = (props) => {   
    return (<Base params={props}></Base>);
  }

  /**
   * @param params contiene todas las props
   * @returns componete con formulario para inicio sesión
   */
  const login = (props) => {
    return (<Login params={props} />);
  }

  const loadRender = () => {
    /**
     * Comprobamos si tenemos una cookies con el token generado desde la api del backen
     * de lo contrario renderizamos el componete login que nos muestra un formulario
     * para iniciar sesión.
     */
    if(isAuth()){
      return (base());
    }else{
      return (login());
    }
  }

  return (loadRender());
}
  

export default App;
