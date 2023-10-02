import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://betacode-lab:qsXEUd8s8bFB1HOf@cluster0.hvqqe55.mongodb.net/ciberSecurityApp');
        console.log('Connection established');
    } catch (error) {
        console.log('error');
    }
}

export default dbConnection;