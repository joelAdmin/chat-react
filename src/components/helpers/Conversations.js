import {API, headers} from '../lib/Lib';
import axios from 'axios';

const getConversations = async (chat_id) =>{
    const result = await fetch(API.urlApi+'getMessage/'+chat_id, headers);
    const data = await result.json();
    return data;
}

export default getConversations;