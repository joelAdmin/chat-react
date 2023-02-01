import {API, headers, cookies} from '../lib/Lib';

export const getuserAuth = async () =>{
    const user_id = cookies.get('usuario_id');
    let user = '';
    await fetch(API.urlApi+'user/'+user_id, headers).then(response=>response.json()).then(data => {
        user = data
    })
    return user;
}