import {cookies} from '../lib/Lib';

const headerS = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+cookies.get('token')
    },
    mode:'cors',
}

export const getChatsM = async (userId) =>{
    const header = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+cookies.get('token')
        },
        mode:'cors',
    }
    const result = await fetch(process.env.REACT_APP_URL_API+'chatsAuthM/'+userId, header);
    const data = await result.json();
    return data;
}

export const getSubChats = async (emisor_id) =>{
    //validar por que no funciona con la declarada afuera
    const header = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+cookies.get('token')
        },
        mode:'cors',
    }
    const result = await fetch(process.env.REACT_APP_URL_API+'subChatAuthM/'+emisor_id, header);
    const data = await result.json();
    return data;
}

export const getChatsU = async (usuario_id) =>{
    const header = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+cookies.get('token')
        },
        mode:'cors',
    }
    const result = await fetch(process.env.REACT_APP_URL_API+'chatsAuthU/'+usuario_id, header);
    const data = await result.json();
    return data;
}