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
                resolve(result.map(venta=>{
                    return{
                      id:venta.idVENTA,
                      idUsuario:venta.idUSUARIO,
                      fecha_venta:venta.fecha_venta
                    }
                }))
            })
        })
    }

    getsNumberRows(){
      return new Promise((resolve,reject)=>{
        this.connection.query(querys.getsNumberRows,(err,result)=>{
          if(err){
            return reject(new Error('A ocurrido un error: '+err))
          }
          resolve(result.map(count=>{
              return{
                num_ventas:count['count(*)']
              }
          })[0])
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
                resolve(result.map(venta=>{
                    return{
                      id:venta.idVENTA,
                      idUsuario:venta.idUsuario,
                      fecha_venta:venta.fecha_venta
                    }
                })[0])
            })
        })
    }
    create(venta){
        return new Promise((resolve,reject)=>{
              this.connection.query(querys.create,venta,(err,result)=>{
              if(err){
                  return reject(new Error('A ocurrido un error: '+err))
              }
              else{
                  resolve({message:"Se inserto en la base de datos!"});

              }

            })
        })
    }

    transaccion(venta,detalles){
      return new Promise((resolve,reject)=>{
        this.connection.beginTransaction(err=>{
          if(err){
            return reject(new Error('A ocurrido un error: '+err))
          }
          else{
            this.connection.query(querys.create,venta,(err,results)=>{
              if(err){
                return this.connection.rollback(()=>{
                  reject(new Error('A ocurrido un error: '+err))
                })
              }
              else{
                detalles.forEach(_detalle => {
                  this.connection.query("SELECT * FROM PRODUCTO WHERE idPRODUCTO = ?",[_detalle.idPRODUCTO],(err,result)=>{
                    if(err){
                      return reject(new Error('A ocurrido un error: '+err))
                    }
                    let product = result.map(producto=>{
                        return{
                          id:producto.idPRODUCTO,
                          nombre:producto.nombre,
                          precio:producto.precio,
                          stock:producto.stock
                        }
                    })[0]
                    let stock_disponible = (product.stock - _detalle.cantidad)
                    if(stock_disponible<0){
                      return this.connection.rollback(()=>{
                        resolve({success:true,message:`Producto ${product.nombre} con stock insuficiente`})
                      })
                    }
                    else{
                      this.connection.query("UPDATE PRODUCTO SET stock = ? WHERE idPRODUCTO = ?",[stock_disponible,_detalle.idPRODUCTO],(err,result)=>{
                        if(err){
                          return reject(new Error('A ocurrido un error: '+err))
                        }
                      })
                    }
                  })
                });
                this.connection.query(querys.detalles,[detalles.map(detalle =>[results.insertId,detalle.idPRODUCTO,detalle.cantidad,detalle.precio])],(err,results)=>{
                  if(err){
                    return this.connection.rollback(()=>{
                      reject(new Error('A ocurrido un error: '+err))
                    })
                  }
                  else{

                    this.connection.commit(err=>{
                      if(err){
                        return this.connection.rollback(()=>{
                          reject(new Error('A ocurrido un error: '+err))
                        })
                      }
                      else resolve({success:true,message:"Guardado con exito!"})
                    })
                  }
                })
              }
            })
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
