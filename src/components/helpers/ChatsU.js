import {API, headers} from '../lib/Lib';
/*import axios from 'axios';
const chats = (usuario_id) => {
    axios.get(API.urlApi+'chatsAuthU/'+usuario_id, headers).then(response =>{
        console.log('response.data.result', response.data.result);
        if(Object.values(response.data.result).length > 0){
            //this.setState({chats:response.data.result});  
            return response.data.result;             
        }else{
            console.log('no hay chats');
        }           
    }).catch(error =>{
        console.log('error 00010x query chats user');
    });
}*/

const getChatsU = async (usuario_id) =>{
    const result = await fetch(API.urlApi+'chatsAuthU/'+usuario_id, headers);
    const data = await result.json();
    return data;
}

export default getChatsU;