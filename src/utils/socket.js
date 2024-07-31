import io from 'socket.io-client';
import React, { createContext } from 'react';
import { getLanguage, getUserInfo } from './localStorage';

const SOCKET_URL = import.meta.env.VITE_REACT_APP_DOMAIN_SOCKET;

const getInfoUser = () => {
  const user = getUserInfo();

  const userId = user && user.userId ? user.userId : 0;
  const msisdn = user && user.msisdn ? user.msisdn : '';

  const token = user && user.accessToken ? `Bearer ${user.accessToken}` : 'Bearer xyz';

  const name = user && user.fullname ? user.fullname : '';

  const language = getLanguage();

  return {
    userId,
    msisdn,
    token,
    name,
    language,
  }
}

let {userId, msisdn, token, name, language } = getInfoUser();

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ['websocket'],
  query: { token, userId, msisdn, room_id: 0, name, language },
})

socket.on('connect', () => {
  console.log('Socket connected');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.log('Socket disconnected:', reason);
});

socket.on('reconnect_attempt', (attempt) => {
  console.log('Reconnect attempt:', attempt);
});

export const setSocketRoomId = async room_id => {
  let {
    userId,
    msisdn,
    token,
    name,
    language
  } = getInfoUser();

  console.log("set socket room id: ", room_id, getInfoUser(), socket);

  if (socket.query.room_id == room_id && socket.query.userId == userId) {
    return;
  }

  socket.query.token = token
  socket.query.userId = userId
  socket.query.msisdn = msisdn
  socket.query.name = name
  socket.query.language = language
  socket.query.room_id = room_id

  socket.disconnect();

  setTimeout(() => {
    socket.connect();
  }, 100);
}


