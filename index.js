const express=require('express')
const port=process.env.PORT ||  8000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors=require('cors')
// var ObjectId = require('mongodb').ObjectID
const app=express()
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://db-user4:fKCbIVcpcGyaqVg9@cluster0.gjn01rr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const studentCollection=client.db('students').collection('information')

        app.get('/edit/:id',async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await studentCollection.findOne(query)
            res.send(result)
            console.log(result);
        })
        app.put('/edit/:id',async(req,res)=>{
            const id=req.params.id
            const filter={_id:ObjectId(id)}
            const updatedUser=req.body
            const option={upsert:true}
            const updatingUser={               
            $set:{
                name:updatedUser.name,
                email : updatedUser.email,
                number:updatedUser.number

            }
            }
            const result=await studentCollection.updateOne(filter,updatingUser,option)
            res.send(result)
        })
        app.delete('/student/:id',async(req,res)=>{
            const id=req.params.id
            const query={_id:ObjectId(id)}
            const result=await studentCollection.deleteOne(query)
            res.send(result)
        })
        app.get('/student',async(req,res)=>{
            const cursor=studentCollection.find({})
            const users=await cursor.toArray();
            res.send(users)
        })
       app.post('/students',async(req,res)=>{
        const user=req.body
        const result=await studentCollection.insertOne(user)
        user.id=result._id
        res.send(user)
       })
    }finally{

    }

}
run().catch(error=>console.log(error))

app.get('/',(req,res)=>{
    res.send("i am from")
})
app.post('/student',(res,req)=>{
    const info=req.body

})

app.listen(port,()=>{
    console.log('server is listening');
})
