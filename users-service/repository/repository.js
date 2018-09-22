const mysql = require('mysql')

class Repository{
    constructor(connectionSettings){
        this.connectionSettings = connectionSettings
        this.connection = mysql.createConnection(this.connectionSettings)
    }

    getProducts(){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM USUARIO",(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                resolve(result.map(users=>{
                    return{
                        id:users.idUSUARIO,
                        username:users.username,
                        password:users.password,
                        role:users.role
                    }
                }))
            })
        }) 
    }

    getProductByid(id){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM USUARIO WHERE idUSUARIO = ?",[id],(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                if(result.length === 0){
                    resolve(undefined)
                }
                resolve(result.map(user=>{
                    return{
                        id:user.idUSUARIO,
                        username:user.username,
                        password:user.password,
                        role:user.role
                    }
                })[0])
            })
        }) 
    }

    disconnect(){
        this.connection.end()
    }
}

module.exports.connect = (connectionSettings) =>{
    return new Promise((resolve,reject)=>{
        if(!connectionSettings.host) throw new Error("A host must be specified.");
        if(!connectionSettings.user) throw new Error("A user must be specified.");
        if(!connectionSettings.password) throw new Error("A password must be specified.");
        if(!connectionSettings.port) throw new Error("A port must be specified.");
        resolve(new Repository(connectionSettings));
    })
}