const {Server}=require('socket.io');
const socketAuth=require('../middlewares/socketAuth.middleware.js');
const {createClient}=require('redis');
const {createAdapter}=require('@socket.io/redis-adapter')
const registerChatHandlers = require('../sockets/chat.socket.js');
let io;
exports.initSocket=async(server)=>{
    if(!process.env.CLIENT_URL){
        process.exit(1);
    }
    const pubClient=createClient({
        url:process.env.REDIS_URL|| 'redis://127.0.0.1:6379'
    });
    pubClient.on('error', (err) => {
        console.error('⚠️ Redis Pub Error:', err.message);
    });

    const subClient = pubClient.duplicate();

    subClient.on('error', (err) => {
        console.error('⚠️ Redis Sub Error:', err.message);
    });

    try {
        await Promise.all([
            pubClient.connect(), 
            subClient.connect()
        ]);
        console.log('⚡ Redis horizontal adapter links established.');
    } catch (err) {
        console.error('❌ Failed to establish Redis socket adapter links:', err.message);
    }
    io=new Server(server,{
        cors:{
            origin:process.env.CLIENT_URL,

        },
        pingTimeout:60000,
        pingInterval:25000,
        adapter:createAdapter(pubClient,subClient)
    })

    io.use(socketAuth);
    io.on('connection',async (socket)=>{
        const userId=socket.user.id;
        await pubClient.hSet('online_users',userId,socket.id);
        io.emit('user_status_change',{userId:userId,status:'online'});
        socket.join(userId);
        registerChatHandlers(io, socket, pubClient);
        socket.on('disconnect',async ()=>{
            await pubClient.hDel('online_users',userId)
            io.emit('user_status_change',{userId:userId,status:'offline'});
        })
    })
    return io;
}