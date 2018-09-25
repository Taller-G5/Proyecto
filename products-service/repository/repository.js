const mysql = require('mysql')
const querys = require('../utils/querys')
class Repository{
    constructor(connectionSettings){
        this.connectionSettings = connectionSettings
        this.connection = mysql.createConnection(this.connectionSettings)
    }

    gets(){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.get,(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                resolve(result.map(productos=>{
                    return{
                        id:productos.idPRODUCTO,
                        nombre:productos.nombre,
                        precio:productos.precio,
                        stock:productos.stock
                    }
                }))
            })
        })
    }

    getByid(id){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.getByid,[id],(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                if(result.length === 0){
                    resolve(undefined)
                }
                resolve(result.map(producto=>{
                    return{
                      id:producto.idPRODUCTO,
                      nombre:producto.nombre,
                      precio:producto.precio,
                      stock:producto.stock
                    }
                })[0])
            })
        })
    }
    create(producto){
        return new Promise((resolve,reject)=>{
              this.connection.query(querys.create,producto,(err,result)=>{
              if(err){
                  return reject(new Error('A ocurrido un error: '+err))
              }
              else{
                  resolve({message:"Se inserto en la base de datos!"});

              }

            })
        })
    }

    update(id){

    }

    delete(id){

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
