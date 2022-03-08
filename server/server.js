var express = require("express");
var cors = require("cors");
var axios = require("axios");
var fetch = require("node-fetch");
const e = require("express");
var exec = require("child_process").exec;

const URL = "https://api.petfinder.com/v2/animals?type=dog&page=1";
const TOKEN_URL = "https://api.petfinder.com/v2/oauth2/token";
const API_KEY = "1PcE3E0Tf6eIIcNTf8wiytdxoBy4ZSEMjDMJKbrAsdJDqYTC6K";
const SECRET = "UvehDKy01zwXUEGGSpFAvyKSZ6t9fWAuBXKcKfTr";
var token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxUGNFM0UwVGY2ZUlJY05UZjh3aXl0ZHhvQnk0WlNFTWpETUpLYnJBc2RKRHFZVEM2SyIsImp0aSI6ImIzYTQzNWEyYzhhOGQ3YmJlMjI3NTBiNTM5NzBlOWViNmI1MWQyMzQzMzQwZTkzYjlhYWU5NzRmNzZmYWUyYzRmYWVhMTI5Y2IyNGMzZTAxIiwiaWF0IjoxNjQ1NTExNDgxLCJuYmYiOjE2NDU1MTE0ODEsImV4cCI6MTY0NTUxNTA4MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ZX6Xi2uUeLyE1fJUZc8NNTeflXhqBrcJbySLq8ewjScIl49Cif7h49C4NU3SgaUTuyU5Ad9EweO2gV1OFCM5_9WAz7jq1bUHjzgIquYEv4_-7A6vkvfxZqr03BxUPkZSQzecxjW2YPQfe7Rt4NbpBgD5js2dXDxSMRfj6f-KzG-uDdT02g_CnoXqFjuJmgQIakFjtGQ4IrsKViAf1yLD4Ft00X8cgiTsN6krvCS7fUEaw-sZ-AuwgvizqoJ5rH1YLr29t9d4ZKbSsTWtAPXAPnUM7imXSqBT8VxZdxuXYSS8NzCH9dS1YVxhEJxPQEyMyt6x8nUjgH3OrrbClRIQWw";
var app = express();
const PORT = process.env.PORT || 3001;

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
app.use(cors());
app.get("/search", (req, res) => {
    search(res,URL);
})
app.get("/test", (req, res) => {
   search(res,'https://api.petfinder.com/v2/types'); 
});
app.listen(PORT);
