import { useEffect } from 'react';
import Echo from 'laravel-echo';
import io from 'socket.io-client';

const MyComponent = () => {
  useEffect(() => {
    const echo = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ':6001', // reemplaza con tu URL de Socket.IO
      client: io,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`, // reemplaza con tu token de autenticación
        },
      },
    });

    echo.channel('my-channel')
        .listen('MyEvent', (data) => {
          console.log('Received data: ', data);
        });

    return () => {
      echo.disconnect();
    };
  }, []); // asegúrate de que el efecto se ejecute solo una vez al montar el componente

  axios.get(process.env.REACT_APP_URL_API+'chatsAuthM/'+auth.userAuth.usuario_id, headers).then(response => {  
    console.log(response);
    dispatch(getChatsMaster(response.data.result));
  }).catch(function (error) {
    console.log(error);
  });

  axios.get(process.env.REACT_APP_URL_API+'chatsAuthU/'+auth.userAuth.usuario_id, headers).then(response => {  
    dispatch(getChatsUser(response.data.result));				
  }).catch(function (error) {
    console.log(error);
  })

  axios.get(process.env.REACT_APP_URL_API+'subChatAuthM/'+emisor_id, headers).then(response => {
    if(response.data.res)
    { 
        console.log('recibiendo subcat de api');
        console.log(response);
          dispatch(getSubChatsMaster(response.data.result));
      }
  }).catch(error => {
      console.log(error);
  });

  axios.get(process.env.REACT_APP_URL_API+'getMessage/'+chat_id, headers).then(response => {
    console.log('recibiendo conversation de api');				
    dispatch(getConversation(response.data.result));
    topScroll();				
  }).catch(error =>{
      console.log(error);
  });

  axios.get(API.urlApi+'subChatAuthM/'+emisor_id, headersSetToken(cookies.get('token'))).then(response => {
    if(response.data.res)
    { 
        dispatch(getSubChatsMaster(response.data.result));
        setloadSubChat(true);
    }
}).catch(error => {
    console.log(error);
});

};
//on estos pasos, deberías poder utilizar Laravel Echo en tu proyecto React de manera efectiva y evitar que se ejecute la sentencia más de una vez.





