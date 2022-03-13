require('dotenv').config();
var express = require("express");
var cors = require("cors");
var axios = require("axios");
var fetch = require("node-fetch");
const e = require("express");
var exec = require("child_process").exec;
const jwt=require('jsonwebtoken');
var mysql = require("mysql");

const TOKEN_URL = "https://api.petfinder.com/v2/oauth2/token";
const API_KEY = "1PcE3E0Tf6eIIcNTf8wiytdxoBy4ZSEMjDMJKbrAsdJDqYTC6K";
const SECRET = "UvehDKy01zwXUEGGSpFAvyKSZ6t9fWAuBXKcKfTr";
var token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxUGNFM0UwVGY2ZUlJY05UZjh3aXl0ZHhvQnk0WlNFTWpETUpLYnJBc2RKRHFZVEM2SyIsImp0aSI6ImIzYTQzNWEyYzhhOGQ3YmJlMjI3NTBiNTM5NzBlOWViNmI1MWQyMzQzMzQwZTkzYjlhYWU5NzRmNzZmYWUyYzRmYWVhMTI5Y2IyNGMzZTAxIiwiaWF0IjoxNjQ1NTExNDgxLCJuYmYiOjE2NDU1MTE0ODEsImV4cCI6MTY0NTUxNTA4MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ZX6Xi2uUeLyE1fJUZc8NNTeflXhqBrcJbySLq8ewjScIl49Cif7h49C4NU3SgaUTuyU5Ad9EweO2gV1OFCM5_9WAz7jq1bUHjzgIquYEv4_-7A6vkvfxZqr03BxUPkZSQzecxjW2YPQfe7Rt4NbpBgD5js2dXDxSMRfj6f-KzG-uDdT02g_CnoXqFjuJmgQIakFjtGQ4IrsKViAf1yLD4Ft00X8cgiTsN6krvCS7fUEaw-sZ-AuwgvizqoJ5rH1YLr29t9d4ZKbSsTWtAPXAPnUM7imXSqBT8VxZdxuXYSS8NzCH9dS1YVxhEJxPQEyMyt6x8nUjgH3OrrbClRIQWw";
var app = express();
const PORT = process.env.PORT || 3001;
const createUserQuery =
  "INSERT INTO account (name,username,password) VALUES(?,?,?)";
const fetchUserQuery = "SELECT * FROM account WHERE username=? AND password=?";
const checkAlreadyExist="SELECT * FROM account WHERE username=?"
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "sql_account",
});

const getNewToken = () => {
  exec(
    `curl -d "grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET}" https://api.petfinder.com/v2/oauth2/token`,
    (err, res) => {
      token = JSON.parse(res).access_token;
    }
  );
};
const search = (res,url) => {
   return axios.get(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then(result=>res.json(result.data)).catch(()=>{
      getNewToken()
      search(res,url)});
};
app.use(express.json());
app.use(cors());
app.get("/search", (req, res) => {
  let page=req.query.page||1;
  var URL = `https://api.petfinder.com/v2/animals?type=dog&page=${page}&limit=100`;
    search(res,URL);
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

// app.get("/user/:id", (req, res) => {
//   console.log(req.params);
//   res.status(403).render();
//   //res.send('you requested id' +req.params);
//   //es.status(200).send('you requested for user id ',req.params);
// });
app.get('/user',authToken,(req,res)=>{
  res.send(req.user);
})
app.get('/authenticate',authToken,(req,res)=>{
  res.send("Hi");
})
function authToken(req,res,next){
  console.log('here')
  const authHeader=req.headers['authorization'];
  console.log(authHeader)
  const token=authHeader&& authHeader.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).send('Token not received');
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if (err) return res.status(401).send('Token no longer valid - no access')
    req.user=user;
    console.log('next')
    next();
  })
}
app.listen(PORT);
