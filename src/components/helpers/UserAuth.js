import {API, headers} from '../lib/Lib';

const getuserAuth = async () =>{
    const user_id = localStorage.getItem('usuario_id');
    const result = await fetch(API.urlApi+'user/'+user_id, headers);
    const data = await result.json();
    return data;
}

export default getuserAuth;