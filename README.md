# Sistema de Chat de Soporte - Frontend (React)

Este proyecto es una aplicación de chat de soporte al cliente desarrollada en React, diseñada para interactuar con un backend Laravel mediante una API REST y comunicación en tiempo real a través de WebSockets.

## 🚀 Tecnologías Principales

- **Frontend:** React 17 (Hooks & Functional Components)
- **Estado Global:** Redux Toolkit (@reduxjs/toolkit)
- **Comunicación en Tiempo Real:** Laravel Echo & Pusher-js
- **Peticiones HTTP:** Axios
- **Estilos:** Bootstrap & JQuery (para animaciones y scroll)
- **Rutas:** React Router Dom v6

## 🛠️ Configuración Técnica de WebSockets

El sistema utiliza **Laravel Echo** con el driver de **Pusher** para gestionar la comunicación bidireccional. La conexión se establece con un servidor de WebSockets autohospedado (Laravel WebSockets).

### Configuración en `src/components/lib/Lib.js`:

```javascript
export const ECHO = new Echo({
    broadcaster: process.env.REACT_APP_BROADCASTER,    
    key: process.env.REACT_APP_KEY,
    cluster: process.env.REACT_APP_CLUSTER,
    authEndpoint: process.env.REACT_APP_AUTH_END_POINT,
    wsHost: process.env.REACT_APP_WS_HOST,
    wsPort: process.env.REACT_APP_WS_PORT,
    wssPort: process.env.REACT_APP_WSS_PORT,
    forceTLS: true,
    encrypted: true,
    auth: {
        headers: {
           Authorization: "Bearer " + cookies.get('token'),
           Accept: "application/json",
        }
    },
});
```

### Manejo de Eventos en Tiempo Real (`src/components/Home.js`):

El chat escucha eventos en un canal privado basado en el ID del usuario autenticado:

```javascript
ECHO.private(`new-message.${usuario_id}`)
    .listen('.NewMessage', (data) => {
        // Lógica para actualizar el estado de Redux y la UI
        if (chatAbierto && data.chat_id === chatActual) {
            actualizarConversacion(data.chat_id);
        } else {
            actualizarListaDeChats();
        }
    });
```

## ⚙️ Variables de Entorno (.env)

Para que la conexión funcione correctamente, deben definirse las siguientes variables:

```env
REACT_APP_URL_API=https://api-alp.jlssystem.com/api/
REACT_APP_BROADCASTER=pusher
REACT_APP_KEY=141115
REACT_APP_WS_HOST=wss.jlssystem.com
REACT_APP_WS_PORT=6001
REACT_APP_WSS_PORT=6001
REACT_APP_AUTH_END_POINT=https://api-alp.jlssystem.com/api/broadcasting/auth
```

## 📂 Estructura del Proyecto

- `/src/features/`: Slices de Redux (auth, chat, conversation).
- `/src/components/layout/`: Componentes de la interfaz (Sidebar, Chat, Footer).
- `/src/components/helpers/`: Lógica de negocio y llamadas a la API.
- `/src/components/lib/`: Configuración centralizada (ECHO, Axios, Cookies).

## 🏃‍♂️ Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`.
3. Configurar el archivo `.env` con las credenciales del servidor WebSocket.
4. Iniciar la aplicación: `npm start`.

---
*Desarrollado para la gestión de soporte al cliente en tiempo real.*
