import {API, headers} from '../lib/Lib';

export const getConversations = async (chat_id) =>{
    const result = await fetch(API.urlApi+'getMessage/'+chat_id, headers);
    const data = await result.json();
    return data;
}