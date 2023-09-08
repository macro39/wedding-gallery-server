var express = require('express');
var request = require('request');
var cors = require('cors');

var app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World');
})

var refreshToken = "1//04nFNj6_hRC2nCgYIARAAGAQSNwF-L9IrzNYeqeHb4NvYH9y-yg3WelFD4A-L7Np0vTvrKEyK1yrZvGgk1Nyu0iY64N6S0JQNtHs"

app.post("/token", function(req, res) {
    refreshToken = req.body.refresh_token;
    console.log(refreshToken)
    res.send("Refresh token updated succesfully");
  });

app.get('/token', function (req, res) {
    var clientServerOptions = {
        uri: 'https://developers.google.com/oauthplayground/refreshAccessToken',
        body: JSON.stringify({
            refresh_token: refreshToken,
            token_uri: "https://oauth2.googleapis.com/token"
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error, response.body);
        const token = JSON.parse(response.body).access_token
        const responseData = {
            token: token
        }
        
        res.end(JSON.stringify(responseData));
    });
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})