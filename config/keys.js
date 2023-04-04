if(process.env.NODE_ENV==='production'){
    module.exports=require('./prod')
}
else{
    module.exports=require('./dev')
    console.log("Map "+ this.MONGO_URI);
}
