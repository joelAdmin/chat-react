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

```text
/
├── .env                # Variables de entorno (API, WebSockets)
├── package.json        # Dependencias y scripts del proyecto
├── public/             # Archivos estáticos
└── src/
    ├── app/
    │   └── store.js    # Configuración central de Redux Toolkit
    ├── components/
    │   ├── helpers/    # Funciones auxiliares y llamadas a API
    │   ├── layout/     # Componentes visuales del chat
    │   └── lib/        # Configuraciones base (Echo, Axios)
    ├── features/
    │   └── user/       # Redux Slices (Estado global)
    ├── App.js          # Componente principal / Control de Auth
    └── index.js        # Punto de entrada / Configuración de Rutas
```

### Detalles de Archivos Clave:

- **`src/App.js`**: Controlador principal de autenticación. Gestiona el flujo de entrada y decide si mostrar el Login o el Home.
- **`src/features/user/`**:
    - `authSlice.js`: Gestiona los datos del usuario logueado y niveles de acceso.
    - `chatSlice.js`: Controla la lista de chats activos y el estado del chat seleccionado.
    - `conversationSlice.js`: Almacena el historial de mensajes de la conversación actual.
- **`src/components/layout/`**:
    - `Conversation.js`: El componente central que renderiza los mensajes y el formulario de envío.
    - `ChatLeftSidebar.js`: Gestiona la lista lateral de contactos y conversaciones recientes.
- **`src/components/lib/Lib.js`**: Configuración centralizada de Laravel Echo, Axios y manejo de cookies.

## 🔄 Flujo de Datos

1. **Autenticación**: Al iniciar, `App.js` verifica las cookies. Si hay un token válido, recupera el perfil del usuario y lo inyecta en el `authSlice` de Redux.
2. **Carga de Contexto**: Dependiendo del rol del usuario (Maestro o Usuario estándar), se cargan las listas de chats correspondientes desde la API.
3. **Comunicación en Tiempo Real**: 
    - Al cargar `Home.js`, se activa la escucha en un canal privado de WebSockets.
    - Cuando llega un evento `NewMessage`, el sistema verifica si el chatID coincide con el chat abierto.
    - Si coincide, actualiza el `conversationSlice` para mostrar el mensaje instantáneamente.
    - Si no coincide, actualiza los contadores o la lista en el `chatSlice`.
4. **Envío de Mensajes**: El usuario envía un mensaje -> Se añade visualmente a la UI de forma optimista -> Se envía vía Axios al backend -> El backend emite el evento vía WebSockets para otros participantes.

## 🏃‍♂️ Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar dependencias: `npm install`.
3. Configurar el archivo `.env` con las credenciales del servidor WebSocket.
4. Iniciar la aplicación: `npm start`.

---
*Desarrollado para la gestión de soporte al cliente en tiempo real.*
