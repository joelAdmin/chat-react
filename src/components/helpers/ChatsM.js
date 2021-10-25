
import {API, headers} from '../lib/Lib';

const getChats = async () =>{
	const user_id = localStorage.getItem('usuario_id');
    const result = await fetch(API.urlApi+'chatsAuthM/'+user_id, headers);
    const data = await result.json();
    return data;
}

export default getChats;