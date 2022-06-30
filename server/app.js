require('dotenv').config();
var express = require("express");
var cors = require("cors");
var axios = require("axios");
var serverless=require('serverless-http')
var fetch = require("node-fetch");
const e = require("express");
var exec = require("child_process").exec;
const jwt=require('jsonwebtoken');
const path=require('path')
var mysql = require("mysql");
const apicache=require('apicache')
let cache=apicache.middleware

const API_KEY2=process.env.API_KEY2
var sengrid=require('@sendgrid/mail');
const { CONNREFUSED } = require('dns');
sengrid.setApiKey(API_KEY2);

const dbusername=process.env.dbusername
const dbpassword=process.env.dbpassword
const dbhost=process.env.dbhost
const dbname=process.env.dbname

const TOKEN_URL = "https://api.petfinder.com/v2/oauth2/token";
const API_KEY = process.env.API_KEY
const SECRET = process.env.SECRET;
var token;
var app = express();
const PORT = process.env.PORT || 3001;

const updatePasswordQuery="UPDATE account SET password=? WHERE username=?"
const createUserQuery ="INSERT INTO account (name,username,password,avatar) VALUES(?,?,?,?);";
const fetchUserQuery = "SELECT * FROM account WHERE username=? AND password=?";
const checkAlreadyExist="SELECT * FROM account WHERE username=?"
const saveQuery="UPDATE saved SET saved=concat('[',TRIM(LEADING '[' FROM TRIM(TRAILING ']' FROM COALESCE(saved,''))),?,',',']') WHERE username=?"
const getSavedQuery="SELECT saved FROM saved WHERE username=?"
const removeSavedQuery="UPDATE saved SET saved=REPLACE(saved,CONCAT(?,','),'')"
var con = mysql.createPool({
  host: dbhost,
  user:dbusername,
  password: dbpassword,
  database: dbname,
});

var qs = require('qs');
var data = qs.stringify({
  'grant_type': 'client_credentials',
  'client_id': `${API_KEY}`,
  'client_secret': `${SECRET}` 
});
var config = {
  method: 'post',
  url: 'https://api.petfinder.com/v2/oauth2/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};
app.use(express.json());
app.use(cors({origin:'*'}));
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
// })
const getNewToken = () => {
  return axios(config);
  // return new Promise((resolve,reject)=>{exec(
  //   `curl -d "grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET}" https://api.petfinder.com/v2/oauth2/token`,
  //   (err, res) => {
  //     if(err) {reject(err);}
  //     else{
  //     token = JSON.parse(res).access_token;
  //     resolve(token);
  //     }
  //   }
  // )
  // })
}
const search = (res,url,tokenn) => {
  console.log('token received')
   return axios.get(url, {
    headers: {
      Authorization: "Bearer " + tokenn,
    },
  }).then(result=>{
    console.log('hooray, result is here')
    return res.json(result.data)}).catch(async (err)=>{
      console.log('ERROR IS',err)
      if (err=='Error: Request failed with status code 401'){
      console.log('getting new token')
      var newToken=await getNewToken();
      var officialToken=newToken.data.access_token;
      console.log('token method executed',officialToken)
     return search(res,url,officialToken)}
     else res.status(403).send('something is wrong')
    });
};

app.get("/search/:page",cache('60 minutes'), (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  let page=req.params.page;
  let location=req.query.location!=''?'&location='+req.query.location:'';
  let type=req.query.type!=''?'&type='+req.query.type:'';
  let coat=req.query.coat!=''?'&coat='+req.query.coat:'';
  let color=req.query.color!=''?'&color='+req.query.color:'';
  let gender=req.query.gender!=''?'&gender='+req.query.gender:'';
  console.log(" all info is",location,type,coat,color,gender);
  let URL = `https://api.petfinder.com/v2/animals?&page=${page}&limit=100${location+type+coat+color+gender}`;
    search(res,URL,token);
})
app.get("/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

   search(res,'https://api.petfinder.com/v2/types'); 
});
app.post("/signup", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  con.query(checkAlreadyExist,[req.body.email],(err,result)=>{
    if (err) console.log(err)
    else if (result.length!=0) {
     res.status(400).send({message:'Account already existed'});
    }
    else 
   
      con.query(
        createUserQuery,
        [req.body.name, req.body.email, req.body.password,req.body.avatar,req.body.email,req.body.avatar],
        (err, result) => {
          if (err) console.log(err);
            else{
              con.query("INSERT into saved (username) VALUE(?)",req.body.email,(err,resultt)=>{
                if (err) console.log(err)
                else
                res.send('Account successfully created');
              })
            }
          } 
      );
 
    
  })
});
app.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

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
  res.header("Access-Control-Allow-Origin", "*");

  res.send(req.user);
})
app.get('/authenticate',authToken,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  res.send("Hi");
})

app.post('/reset-password',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

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
        html:`<a href="http://localhost:3000/reset-password/${accessToken}">Reset password</a>`
      }
      sengrid.send(message).then(()=>console.log('email sent')).catch(console.log)
      }
    else res.status(400).send("account does not exist");
  })
})
app.get('/reset-password/:token',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  var token=req.params.token;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(401).send('Token no longer valid - no access')
    res.sendFile(path.join(__dirname, './public', 'index.html'));
    
  })
})
app.put('/reset-password-next',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  var token=req.body.token;
  var newPassword=req.body.newPassword;
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(401).send('Token no longer valid - no access')
    con.query(updatePasswordQuery,[newPassword,user[0].username],(err,result)=>{
      if (err) console.log(err);
      else 
        res.end();
    })   
  })
})
app.get('/save',savedAuthToken,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  console.log("saving animal ",req.animalId,req.user[0].username)
  let animalObj={
    id:req.animalId,
    name:req.animalName,
    photo:req.animalPhoto,
    gender:req.animalGender,
    location:req.animalLocation,
    breed:req.animalBreed
  }
  con.query(saveQuery,[JSON.stringify(animalObj),req.user[0].username],(err,result)=>{
    if (err) console.log(err);
    else{
    console.log(result);
    res.end()
    }
  })
})
app.get('/unsave',savedAuthToken,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  console.log('user want to unsave')
  let animalObj={
    id:req.animalId,
    name:req.animalName,
    photo:req.animalPhoto,
    gender:req.animalGender,
    location:req.animalLocation,
    breed:req.animalBreed
  }
  con.query(removeSavedQuery,[JSON.stringify(animalObj),req.user[0].username],(err,result)=>{
    if (err) console.log(err);
    else{
    console.log('unsave done');
    res.end()
    }
  })


  // con.query(removeSavedQuery,[req.animalId],(err,result)=>{
  //   if (err) console.log(err);
  //   else{
  //     res.send('Removed saved animal')
  //   }
  // })
})
app.get('/getSaved',authToken,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

    con.query(getSavedQuery,[req.user[0].username],(err,result)=>{
      if (err) console.log(err)
      else{
        let savedAnimalsId=[];
        if (result[0].saved==null) res.send(null)
        else{
          var stringArray=result[0].saved;
          var newStringArray=stringArray.slice(0,-2)+']';
          console.log(newStringArray);
          res.json(newStringArray);
        }
      }
    })
})
app.get('/petId',authToken,cache('60 minutes'),(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");

  let URL='https://api.petfinder.com/v2/animals/'+req.query.animalId;
  search(res,URL,token)
})
app.get('/avatar',authToken,(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true)

  console.log('get avatar')
  con.query(checkAlreadyExist,[req.user[0].username],(err,result)=>{
    if (err) console.log(err)
    else{
      console.log(result)
      res.send(result[0].avatar);
      
    }
  })
})
function savedAuthToken(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true)

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
    req.animalName=req.query.animalName;
    req.animalPhoto=req.query.animalPhoto;
    req.animalGender=req.query.animalGender;
    req.animalLocation=req.query.animalLocation;
    req.animalBreed=req.query.animalBreed;
    console.log('next')
    next();
  })
}
function authToken(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true)

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
app.get('/testt',(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.json({message:'hi'})
})
app.listen(PORT);
module.exports.handler = serverless(app);

