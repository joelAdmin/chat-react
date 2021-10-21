//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Base from './components/Base.js';
import Login from './components/Login';

class App extends Component{

  constructor(props){
    super(props);
    this.state =({
      user:{},
      token:''
    });

  }
  
  app =()=> {
    
    return (<Base params={this.props}></Base>);
  }

  login =()=>{
    return (<Login params={this.props} />);
  }

  loadRender =()=>{
    //Verificamos si soporta la caché local
    if (localStorage){
      //Como Saber si existe Sidebar
      if(localStorage.getItem('token') !== undefined && localStorage.getItem('token')){
        return (this.app());
      }else{
        return (this.login());
      }
    }
    console.log('validando si existe el token');
  }

  render(){
    return(this.loadRender());
  }
}
export default App;
