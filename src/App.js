//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Base from './components/Base.js';
import Login from './components/Login';
import {cookies, clearCookies} from './components/lib/Lib';

class App extends Component{

  constructor(props){
    super(props);
    this.state =({
      user:{},
      token:''
    });

  }
  
  /**
   * @param params contiene todas las props
   * @returns componete base con cada una de las
   * partes que conforma el app plantilla
   */

  app =()=> {    
    return (<Base params={this.props}></Base>);
  }

  /**
   * @param params contiene todas las props
   * @returns componete con formulario para inicio sesión
   */
  login =()=> {
    return (<Login params={this.props} />);
  }

  loadRender =()=>{
    /*
    if (localStorage){
      if(localStorage.getItem('token') !== undefined && localStorage.getItem('token')){
        return (this.app());
      }else{
        return (this.login());
      }
    }
    console.log('validando si existe el token');*/

    /**
     * Comprobamos si tenemos una cookies con el token generado desde la api del backen
     * de lo contrario renderizamos el componete login que nos muestra un formulario
     * para iniciar sesión.
     */
    if(cookies.get('token') !== undefined && cookies.get('token')){
      return (this.app());
    }else{
      return (this.login());
    }
  }

  render(){
    return(this.loadRender());
  }
}
export default App;
