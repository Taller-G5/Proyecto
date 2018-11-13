const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')

console.log("--- User Service---")
console.log("Connecting to user repository...")

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
    server.start({
        port:config.port,
        repository:repo
    }).then((app)=>{
        console.log(`Servicio iniciado con exito, corriendo en el puerto:  ${config.port}.`)
        app.on('close',()=>{
            repository.disconnect();
        })
    })
})
