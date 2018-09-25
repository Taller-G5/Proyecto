const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('../services/jwt')
class Repository{
    constructor(connectionSettings){
        this.connectionSettings = connectionSettings
        this.connection = mysql.createConnection(this.connectionSettings)
    }

    getUsers(){
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

    getUserByid(id){
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

    login(username,password){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM USUARIO WHERE username = ?",[username],(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                if(result.length === 0){
                    resolve({success:false,message:"Usuario no registrado"})
                }
                else{
                    let user = result.map(user=>{
                        return{
                            id:user.idUSUARIO,
                            username:user.username,
                            password:user.password,
                            role:user.role
                        }
                    })[0]
                    bcrypt.compare(password,user.password,(err,valid)=>{
                        if(valid){
                            const token = jwt.createToken(user)
                            resolve({success:true,token})
                        }
                        else resolve({success:false,message:"Contraseña incorrecta"})
                    })
                }
            })
        })
    }

    register(user){
        return new Promise((resolve,reject)=>{
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) return console.log(`Error: ${err}`)
                bcrypt.hash(user.password,salt,(err,hash)=>{
                    if(err) return console.log(`Error: ${err}`)
                    user.password = hash
                    this.connection.query("INSERT INTO USUARIO SET ?",user,(err,result)=>{
                        if(err){
                            return reject(new Error('A ocurrido un error: '+err))
                        }
                        else{
                            resolve({message:"Se inserto en la base de datos!"});

                        }

                    })
                })
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
