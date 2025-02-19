import mongoose from 'mongoose';

const connect = async () =>
{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');
    }
    catch (e)
    {
        throw e;
    }
}

export default connect;