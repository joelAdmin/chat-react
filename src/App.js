//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import BaseN from './components/BaseN.js';
import Home from './components/Home.js';
import Login from './components/Login';
import {isAuth, API, cookies, headers, clearCookies} from './components/lib/Lib';  
import {getuserAuth} from './components/helpers/UserAuth';

//acceder a los hooks de redux toolkit para 
import {useSelector, useDispatch} from 'react-redux';
//importar mis Slice definidos 
import {setLogin} from './features/user/authSlice';
//import {API, headers, cookies} from './components/lib/Lib';

import axios from 'axios';


const App = () => {

  const estado = useSelector((state) => state);
  const dispatch = useDispatch();
  const [access, setAccess] = useState('');
  const [auth, setAuth] = useState({});

  const addStoreInfoUser = () => {
    console.log('addStoreInfoUser')
    getuserAuth().then(response => {
      dispatch(setLogin({
        access:response.access,
        userAuth:response.result
      })); 
      setAccess(response.access);   
      setAuth(response.result);  
    });	
  }

  const getuserAuthHere = async () =>{
      const user_id = cookies.get('usuario_id');
      let user = '';
      await fetch(API.urlApi+'user/'+user_id, headers).then(response=>response.json()).then(data => {
          user = data
          dispatch(setLogin({
            access:data.access,
            userAuth:data.result
          }));
      })
      //return user;
  }

  const setUserAuth = () => {
    console.log('ejecuntando ....');
    const user_id = cookies.get('usuario_id');
    axios.get(API.urlApi+'user/'+user_id, headers).then(response => {
        if(response.data.res)
        { console.log(response)    
          dispatch(setLogin({
            access:response.data.access,
            userAuth:response.data.result
          }));
          //return response;  
        }else
        {
          return false;
        }       
    }).catch(error =>{
        console.log(error);
    });
  }

  useEffect(() => {
    console.log('inicinado..')
    //loadRender()
    if(isAuth())
    {
      setUserAuth()
      /*console.log('inicinado 2..');
      let auth = typeof setUserAuth() != 'undefined'? auth :{};
      console.log(auth.length);
      if(auth.length == 0)
      {
        console.log('entro');
        dispatch(setLogin({
          access:auth.data.access,
          userAuth:auth.data.result
        }));
      }  */  
    }
  }, []);
  
  /**
   * @param params contiene todas las props
   * @returns componete base con cada una de las
   *  partes que conforma el app plantilla
   */
  
  const base = (props) => {   
    return (<Home params={props}></Home>);
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
      //addStoreInfoUser()  
      console.log(2);
      return (base());
    }else{
      return (login());
    }
  }

  return (loadRender());
}
  

export default App;
