const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')

console.log("--- Customer Service---")
console.log("Connecting to customer repository...")

process.on('uncaughtException', function(err) {
    console.error('Unhandled Exception', err);
  });
process.on('unhandledRejection', function(err, promise){
    console.error('Unhandled Rejection', err);
});

repository.connect({
    host:config.db.host,
    database:config.db.database,
    user: config.db.user,
    password:config.db.password,
    port : config.db.port
}).then(repo=>{
    console.log("Connected to DB")
    console.log("Starting Server..")
    server.start({
        port:config.port,
        repository:repo
    }).then((app)=>{
        console.log(`Served started successfully, running on port ${config.port}.`)
        app.on('close',()=>{
            repository.disconnect();
        })
    })
})