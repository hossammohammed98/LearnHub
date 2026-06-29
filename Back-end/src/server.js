require('dotenv').config({ path: './src/config/.env' });const http=require('http');
const app=require('./app');
const {connectDB}=require('./config/db')
const {initSocket}=require('./config/socket');

const PORT=process.env.PORT||5000;

const server=http.createServer(app);

const io=initSocket(server);

global.io=io;

const startServer = async () => {
    try {
        await connectDB();
        console.log('💾 Database connected successfully.');

        server.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error(`❌ Server initialization failure: ${error.message}`);
        process.exit(1); 
    }
};

startServer();
