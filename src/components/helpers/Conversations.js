import {API, cookies} from '../lib/Lib';

export const getConversations = async (chat_id) => {
    const header = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+cookies.get('token')
        },
        mode:'cors',
    }
    let url = process.env.REACT_APP_URL_API+'getMessage/'+chat_id;
    const result = await fetch(url, header);
    const data = await result.json();
    return data;
}