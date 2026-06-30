const { Server } = require('socket.io');
const { socketAuth } = require('../middlewares/socketAuth.middleware.js.js');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const registerChatHandlers = require('../sockets/chat.socket.js');

let io;

exports.initSocket = async (server) => {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    let pubClient;
    let adapter;

    if (process.env.REDIS_URL) {
        pubClient = createClient({
            url: process.env.REDIS_URL,
            socket: {
                keepAlive: 50000,
                connectTimeout: 10000,
            },
        });

        pubClient.on('error', (err) => {
            console.error('Redis Pub Error:', err.message);
        });

        const subClient = pubClient.duplicate();

        subClient.on('error', (err) => {
            console.error('Redis Sub Error:', err.message);
        });

        try {
            await Promise.all([
                pubClient.connect(),
                subClient.connect(),
            ]);
            adapter = createAdapter(pubClient, subClient);
            console.log('Redis socket adapter links established.');
        } catch (err) {
            console.warn('Redis socket adapter unavailable, using in-memory socket adapter:', err.message);
        }
    }

    io = new Server(server, {
        cors: {
            origin: clientUrl,
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
        transports: ['polling', 'websocket'],
        ...(adapter ? { adapter } : {}),
    });

    io.use(socketAuth);
    io.on('connection', async (socket) => {
        console.log(`Connected: User [${socket.user.id}] established real-time sync channel.`);
        const userId = socket.user.id;

        if (pubClient?.isOpen) {
            await pubClient.hSet('online_users', String(userId), socket.id);
        }

        io.emit('user_status_change', { userId, status: 'online' });
        socket.join(String(userId));
        registerChatHandlers(io, socket, pubClient);

        socket.on('disconnect', async () => {
            if (pubClient?.isOpen) {
                await pubClient.hDel('online_users', String(userId));
            }
            io.emit('user_status_change', { userId, status: 'offline' });
        });
    });

    return io;
};
