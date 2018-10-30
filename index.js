var http = require('http');
const winston = require('winston')

// Import Models
const {User} = require('./models/authentication.js');

function logRequest(req, res) {
    let log_level = 'info';
    if (res.statusCode > 300) {
        log_level = 'error'
    }
    winston.log(log_level, req.headers.host, {
        url: req.url,
        method: req.method,
        status: res.statusCode,
        message: res.statusMessage
    });
}

//create a server object:
http.createServer(function (req, res) {

    if (req.url == '/') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        }); // http header    
        res.write(JSON.stringify({
            'status': 'OK'
        })); //write a response
        res.end();
        logRequest(req, res)
    } else {
        if (req.url == '/create-user') {
            res.writeHead(201, {
                'Content-Type': 'application/json'
            }); // http header    
            // Table created
            return User.create({
                firstName: 'partha',
                lastName: 'saradhi'
            }).then(result => {
                res.statusCode = 201;
                res.write(JSON.stringify(result));
                res.end();
                logRequest(req, res)
            }).catch(err => {
                res.write(err);
                res.end();
                logRequest(req, res)
            });
        }
        if (req.url == '/list-user') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            }); // http header
            // Do async job
            return User.findAll().then(users => {
                res.write(JSON.stringify(users));
                res.end();
                logRequest(req, res);
            }).catch(err => {
                res.write(err);
                res.end();
                logRequest(req, res);
            });
        } else {
            res.statusCode = 404;
            res.write("Invalid Request");
            res.end();
            logRequest(req, res);
        }
    }
}).listen(3000, function () {
    console.log("server start at port 3000"); //the server object listens on port 3000
});