import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:4000" : process.env.NEXT_PUBLIC_PROD_URI); // Connect to the server

export default socket;
