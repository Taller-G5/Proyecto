const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const api_users = require('../api/users')
module.exports.start = (options)=>{
    return new Promise((resolve,reject)=>{
        if(!options.repository) throw new Error("A server must be started with a connected repository.");
        if(!options.port) throw new Error("A server must be started with a port.");

        //  Create the app, add some logging.
        var app = express();
        
        app.use(morgan('dev'));
        app.use(cors())
        //  Add the APIs to the app.
        api_users(app, options);

        //  Start the app, creating a running server which we return.
        var server = app.listen(options.port, () => {
            resolve(server);
        });
    })
}