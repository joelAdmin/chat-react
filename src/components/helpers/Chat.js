import {headers, cookies} from '../lib/Lib';

export const getChatsM = async (userId) =>{
    const result = await fetch(process.env.REACT_APP_URL_API+'chatsAuthM/'+userId, headers);
    const data = await result.json();
    return data;
}

export const getSubChats = async (emisor_id) =>{
    const result = await fetch(process.env.REACT_APP_URL_API+'subChatAuthM/'+emisor_id, headers);
    const data = await result.json();
    return data;
}

export const getChatsU = async (usuario_id) =>{
    const result = await fetch(process.env.REACT_APP_URL_API+'chatsAuthU/'+usuario_id, headers);
    const data = await result.json();
    return data;
}