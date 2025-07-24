// // import io from 'socket.io-client';
// // import { FetchChatPayload } from '../types';

// // const API_BASE_URL = 'wss://dev.cbcp.app'; // Replace with your actual API base URL

// // export const fetchchatApi = async (payload:FetchChatPayload) => {
// //   try {
// //     console.log("payload",payload)
// //     const { community_id, user_id } = payload;
// //  const ws = new WebSocket(`wss://dev.cbcp.app/livechat/v1/ws?community_id=${community_id}&user_id=${user_id}`);

// // ws.onopen = () => {
// //   console.log('WebSocket connection opened');
// // };

// // ws.onmessage = (message) => {
// //   console.log('Received:', message.data);
// // };

// // ws.onerror = (err) => {
// //   console.error('WebSocket error:', err);
// // };
// //     // const socket = io(`${API_BASE_URL}/livechat/v1/ws?community_id=444&user_id=170`, {
// //     //     transports: ['websocket']
// //     //   });



// //     //  console.log("connect")
// //     //     socket.on('connect', () => {
// //     //       console.log('Connected to server');
// //     //     });

// //     //     socket.on('message', (data) => {
// //     //       console.log('Received message:', data);
           
// //     //     });
// //     //     socket.on('connect_error', (err) => {
// //     //   console.error('Socket connection error:', err);
// //     //   socket.disconnect();
// //     // });
// //    const response = {data:[]}

// //     return response.data;
// //   } catch (error) {
// //     // You can re-throw the error or return error.response for saga to handle
// //     throw error; 
// //   }
// // };

// import { eventChannel } from 'redux-saga';
// import { ChatMessage, FetchChatPayload } from '../types';

// export function createChatSocketChannel(payload: FetchChatPayload) {
//   const { community_id, user_id } = payload;

//   return eventChannel((emit) => {
//     const ws = new WebSocket(
//       `wss://dev.cbcp.app/livechat/v1/ws?community_id=${community_id}&user_id=${user_id}`
//     );

//     ws.onopen = () => {
//       console.log('✅ WebSocket connected');
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data :ChatMessage= JSON.parse(event.data);
//         emit({ type: 'message', data });
//       } catch (err) {
//         emit({ type: 'error', error: 'Invalid message format' });
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('❌ WebSocket error', error);
//       emit({ type: 'error', error });
//     };

//     ws.onclose = () => {
//       console.warn('🔌 WebSocket closed');
//       emit({ type: 'close' });
//     };

//     // Return unsubscribe function
//     return () => {
//       console.log('🔁 Closing WebSocket from channel');
//       ws.close();
//     };
//   });
// }

import { eventChannel } from 'redux-saga';
import { FetchChatPayload } from '../types';

let socket: WebSocket | null = null;

export function createChatSocketChannel(payload: FetchChatPayload) {
  const { community_id, user_id } = payload;

  return eventChannel((emit) => {
    socket = new WebSocket(
      `wss://dev.cbcp.app/livechat/v1/ws?community_id=${community_id}&user_id=${user_id}`
    );

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      emit({ type: 'connected' });
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        emit({ type: 'message', data });
      } catch (err) {
        emit({ type: 'error', error: 'Invalid message format' });
      }
    };

    socket.onerror = (error) => {
      console.log("error",error)
      emit({ type: 'error', error });
    };

    socket.onclose = () => {
      emit({ type: 'close' });
    };

    // Unsubscribe function
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  });
}

// 👇 Function to send message
export function sendMessage(message: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log(message)
    socket.send(JSON.stringify(message));
  } else {
    console.warn('WebSocket not connected. Cannot send message.');
  }
}

// 👇 Function to close connection manually
export function closeSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}
