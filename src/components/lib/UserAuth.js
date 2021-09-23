import React, {Component} from 'react';
import axios from 'axios';
import {config} from '../../Config';
import {headers} from './Headers';

//export const users = {};
class UserAuth extends Component{
    static auth = '';    
    constructor(props){
        super(props);
        this.state=({
            user:[]
        });
    }

    componentDidMount(){
        this.userauth()
    }

    userauth = () =>{
        const user_id = localStorage.getItem('usuario_id');
        axios.get(config.urlApi+'user/'+user_id, headers).then(response =>{
            //console.log('userAuth3:', response.data.result);
            if(response.data.res){         
              this.setState({user:response.data.result});
            }else{
                return false;
            }       
        }).catch(error =>{
            console.log(error);
        });
    }

    render(){
        return (<></>);
    }
}
export default UserAuth;