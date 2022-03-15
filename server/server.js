require('dotenv').config();
var express = require("express");
var cors = require("cors");
var axios = require("axios");
var fetch = require("node-fetch");
const e = require("express");
var exec = require("child_process").exec;
const jwt=require('jsonwebtoken');
const path=require('path')
var mysql = require("mysql");

const API_KEY2='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'
var sengrid=require('@sendgrid/mail');
sengrid.setApiKey(API_KEY2);

const API_KEY1="64b90238fd46902f6435bb063a12259c-dbc22c93-0406e405"
const DOMAIN="sandboxb14500b19fdb4cea846f8e5aa810152c.mailgun.org"
var mailgun = require('mailgun-js')({apiKey: API_KEY1, domain: DOMAIN});

const TOKEN_URL = "https://api.petfinder.com/v2/oauth2/token";
const API_KEY = "1PcE3E0Tf6eIIcNTf8wiytdxoBy4ZSEMjDMJKbrAsdJDqYTC6K";
const SECRET = "UvehDKy01zwXUEGGSpFAvyKSZ6t9fWAuBXKcKfTr";
var token;
var app = express();
const PORT = process.env.PORT || 3001;

const updatePasswordQuery="UPDATE account SET password=? WHERE username=?"
const createUserQuery =
  "INSERT INTO account (name,username,password) VALUES(?,?,?)";
const fetchUserQuery = "SELECT * FROM account WHERE username=? AND password=?";
const checkAlreadyExist="SELECT * FROM account WHERE username=?"
const saveQuery="UPDATE account SET saved=concat(COALESCE(saved,''),?,' ') WHERE username=?"
const getSavedQuery="SELECT saved FROM account WHERE username=?"
const removeSavedQuery="UPDATE account SET saved=REPLACE(saved,CONCAT(?,' '),'')"
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nguyenquan00",
  database: "sql_account",
});

const getNewToken = () => {
  return new Promise((resolve,reject)=>{exec(
    `curl -d "grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET}" https://api.petfinder.com/v2/oauth2/token`,
    (err, res) => {
      if(err) {reject(err);}
      else{
      token = JSON.parse(res).access_token;
      resolve(token);
      }
    }
  )
  })
}
const search = (res,url,tokenn) => {
  console.log('token received',tokenn)
   return axios.get(url, {
    headers: {
      Authorization: "Bearer " + tokenn,
    },
  }).then(result=>{
    console.log('hooray, result is here')
    return res.json(result.data)}).catch(async (err)=>{
      console.log(err)
      console.log('getting new token')
      var newToken=await getNewToken();
      console.log('token method executed',newToken)
     return search(res,url,newToken)});
};
app.use(express.json());
app.use(cors());
app.get("/search/:page", (req, res) => {
  let page=req.params.page;
  var URL = `https://api.petfinder.com/v2/animals?type=dog&page=${page}&limit=100`;
    search(res,URL,token);
})
app.get("/test", (req, res) => {
   search(res,'https://api.petfinder.com/v2/types'); 
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  con.query(checkAlreadyExist,[req.body.email],(err,result)=>{
    if (err) console.log(err)
    else if (result.length!=0) {
     res.status(400).send({message:'Account already existed'});
    }
    else con.query(
      createUserQuery,
      [req.body.name, req.body.email, req.body.password],
      (err, result) => {
        if (err) console.log(err);
        else res.send('Account successfully created');
      }
    );
  })
});
app.post("/login", (req, res) => {
  console.log('login called',req)
  con.query(
    fetchUserQuery,
    [req.body.username, req.body.password],
    (err, result) => {
      if (err) console.log(err);
      if (result.length == 1){ //res.send("logged in successfully");
      const accessToken=jwt.sign(JSON.stringify(result),process.env.ACCESS_TOKEN_SECRET);
      res.json({accessToken:accessToken})
    }
      else res.status(400).send("account does not exist");
    }
  );
});


app.get('/user',authToken,(req,res)=>{
  res.send(req.user);
})
app.get('/authenticate',authToken,(req,res)=>{
  res.send("Hi");
})

app.post('/reset-password',(req,res)=>{
  con.query(checkAlreadyExist,[req.body.username],(err,result)=>{
    if (err) console.log(err);
    if (result.length){
      console.log(result)
      const accessToken=jwt.sign(JSON.stringify(result),process.env.ACCESS_TOKEN_SECRET);
      const message={
        from:"mquan7252@gmail.com",
        to:result[0].username,
        subject:"Adopt Me Password Reset",
        message:"You have just requested a password reset for your account. Please follow the link below to reset your password",
        html:`<a href="http://localhost:3001/reset-password/${accessToken}">Reset password</a>`
      }
      sengrid.send(message).then(()=>console.log('email sent')).catch(console.log)
      }
    else res.status(400).send("account does not exist");
  })
})
app.get('/reset-password/:token',(req,res)=>{
  var token=req.params.token;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(401).send('Token no longer valid - no access')
    res.sendFile(path.join(__dirname, './public', 'index.html'));
    
  })
})
app.put('/reset-password-next',(req,res)=>{
  var token=req.body.token;
  var newPassword=req.body.newPassword;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(401).send('Token no longer valid - no access')
    con.query(updatePasswordQuery,[newPassword,user.username],(err,result)=>{
      if (err) console.log(err);
      else 
        console.log('idk what to put here');
    })



    
  })
})
app.get('/save',savedAuthToken,(req,res)=>{
  console.log("saving animal ",req.animalId,req.user[0].username)
  con.query(saveQuery,[req.animalId,req.user[0].username],(err,result)=>{
    if (err) console.log(err);
    else
    console.log(result);
  })
})
app.get('/unsave',savedAuthToken,(req,res)=>{
  con.query(removeSavedQuery,[req.animalId],(err,result)=>{
    if (err) console.log(err);
    else{
      res.send('Removed saved animal')
    }
  })
})
app.get('/getSaved',authToken,(req,res)=>{
    con.query(getSavedQuery,[req.user[0].username],(err,result)=>{
      if (err) console.log(err)
      else{
        let savedAnimalsId;
        if (result[0].saved==null) savedAnimalsId=null;
        else{
         savedAnimalsId=result[0].saved.split(" ");
        }
        res.send(savedAnimalsId);
      }
    })
})
function savedAuthToken(req,res,next){
  console.log('save auth')
  const authHeader=req.headers['authorization'];
  console.log(authHeader)
  const token=authHeader&& authHeader.split(" ")[1];
  console.log(token)
  if (!token) return res.status(405).send('Token not received');
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(405).send('Token no longer valid - no access')
    req.user=user;
    req.animalId=req.query.animalId;
    console.log('next')
    next();
  })
}
function authToken(req,res,next){
  console.log('here')
  const authHeader=req.headers['authorization'];
  console.log(authHeader)
  const token=authHeader&& authHeader.split(" ")[1];
  console.log(token)
  if (!token) return res.status(405).send('Token not received');
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(405).send('Token no longer valid - no access')
    req.user=user;
    console.log('next')
    next();
  })
}
app.listen(PORT);
