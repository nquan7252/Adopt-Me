const express=require('express');
const app=express();
const path=require('path');

const PORT=process.env.PORT||3000;
const cors=require('cors');
app.use(express.static(path.join(__dirname, "build")));
app.use(cors())

app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, "build", "index.html"))
})
app.listen(PORT);