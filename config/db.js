const mongoose=require('mongoose');
const connectBd=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true
        })
        console.log(`connected to ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}
module.exports=connectBd