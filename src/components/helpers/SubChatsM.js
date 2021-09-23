import {API, headers} from '../lib/Lib';

const getSubChats = async (emisor_id) =>{
	//const user_id = localStorage.getItem('usuario_id');
    console.log('emisor_id', emisor_id)
    const result = await fetch(API.urlApi+'subChatAuthM/'+emisor_id, headers);
    const data = await result.json();
    console.log('getSubchast', data)
    return data;
}

export default getSubChats;