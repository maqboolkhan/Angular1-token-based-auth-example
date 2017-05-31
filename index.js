var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'), // only use to create token
    ejwt = require('express-jwt'), // only use to authenticate token
    moment = require('moment'),
    app = express();

var secret = 'abigsecretwhichisalsounguessable';

// app.use(jwt({ secret: 'shhhhhhared-secret'}) if you use this, authentication will be applied to all routes
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/auth/signup', function (req, res) {
    res.send({token: tokeGenerator(req.body.email)});
});

app.get('/users', ejwt({secret: secret}), function  (req, res) {
    res.send([{name: 'maq'}, {name: 'minch'}, {name: 'baba'}]);
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('You dont have permissions to see this or you have been logout :(');
    }
});

function tokeGenerator (email) {
    var payload = {
        sub: email, // Sub (subject) should be any thing unique
        iat: moment().unix(), // IAT = Issue at time
        exp: moment().add(10, 's').unix() // Token will expire after 10 seconds
    }
    return jwt.sign(payload, secret);
}

app.listen(3000, function () {
    console.log('App is up on http://localhost:3000/');
});