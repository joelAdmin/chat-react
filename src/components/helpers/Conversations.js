import {API, headers} from '../lib/Lib';

export const getConversations = async (chat_id) => {
    console.log(headers);
    let url = process.env.REACT_APP_URL_API+'getMessage/'+chat_id;
    console.log('url:'+url);
    const result = await fetch(url, headers);
    const data = await result.json();
    return data;
}