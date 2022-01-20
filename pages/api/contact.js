import { MongoClient } from "mongodb";

async function handler(req , res){
   
    if(req.method === 'POST'){
        const { name, email, message} = req.body;
        if(!email || 
        !email.includes('@') || 
        !name || 
        name.trim() ==='' || 
        !message || 
        message.trim() === '' 
        ){
            return res.status(422).json({
                message: 'Invalid input. '
            })
        }
        const newMessage = {
            email,
            name,
            message
        }

        let client;
        
        try {
            const user = process.env.mongodb_username;
            const password = process.env.mongodb_password;
            const cluster = process.env.mongodb_cluster;
            const database = process.env.mongodb_database;

            const MongoURI = `mongodb+srv://${user}:${password}@${cluster}.27xsp.mongodb.net/${database}?retryWrites=true&w=majority`;
            client = await MongoClient.connect(MongoURI);        
        }
        catch(error){
            return res.status(500).json({
                message: 'Couldnt not connect to database'
            })
        }

        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage._id = result.insertedId;
        }
        catch(error){
            client.close();
            return res.status(500).json({
                message: 'Storing message failed!'
            })
        }

        client.close();
        
        res.status(201).json({
            message: 'Message sent successfully',
            newMessage
        });
    }
}

export default handler;