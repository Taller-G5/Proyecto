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
                        proovedor:productos.proovedor,
                        precio:productos.precio,
                        precio_compra:productos.precio_compra,
                        stock:productos.stock,
                        descripcion:productos.descripcion,
                        categoria:productos.categoria,
                        image_url:productos.image_url
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
                      proovedor:producto.proovedor,
                      precio:producto.precio,
                      precio_compra:producto.precio_compra,
                      stock:producto.stock,
                      descripcion:producto.descripcion,
                      categoria:producto.categoria,
                      image_url:producto.image_url
                    }
                })[0])
            })
        })
    }
    create(producto){
        return new Promise((resolve,reject)=>{
            this.connection.beginTransaction(err=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                else{
                    this.connection.query(querys.create,producto,(err,result)=>{
                        if(err){
                            return this.connection.rollback(()=>{
                                reject(new Error('A ocurrido un error: '+err))
                            })
                        }
                        else{
                            let nueva_compra ={
                                idPRODUCTO:result.insertId,
                                cantidad:producto.stock,
                                fecha_compra:producto.fecha_registro
                            }
                            this.connection.query(querys.insertCompra,nueva_compra,(err,result)=>{
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
                                        else resolve({success:true,message:"Se registro el producto en la base de datos!"});
                                      })
                                }
                            })
                        }
                      })
                }
            })
              
        })
    }

    update(product){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.update,[product.nombre,product.precio,product.proovedor,product.categoria,product.descripcion,product.id],(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+ err))
                }
                else{
                    resolve({success:true,message:"Producto Actualizado"})
                }
            })
        })
    }

    delete(id){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.delete,[id],(err,result)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+ err))
                }
                else{
                    resolve({success:true,message:"Producto Eliminado"})
                }
            })
        })
    }

    totalGasto(){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.totalGasto,(err,results)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+ err))
                }
                else{
                    resolve(results.map(compra=>{
                        return{
                            nombre:compra.nombre,
                            total_gasto:compra.total_gasto,
                            fecha_compra:compra.fecha_compra
                        }
                    }))
                }
            })
        })
    }

    updateLatest(product){
        return new Promise((resolve,reject)=>{
            this.connection.beginTransaction(err=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                else{
                    let compra={
                        idPRODUCTO:product.id,
                        cantidad:product.nuevo_stock,
                        fecha_compra:product.fecha_compra
                    }
                    this.connection.query(querys.insertCompra,compra,(err,results)=>{
                        if(err){
                            return this.connection.rollback(()=>{
                                reject(new Error('A ocurrido un error: '+err))
                            })
                        }
                        else{
                            this.connection.query(querys.updateStock,[(product.stock+ parseInt(product.nuevo_stock)),product.id],(err,results)=>{
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
                                        else resolve({success:true,message:"Se actualizo el stock del producto"});
                                      })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    totalProductos(){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.totalProductos,(err,results)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+ err))
                }
                else{
                    resolve(results.map(producto=>{
                        return{
                            producto:producto.producto,
                            total:producto.total,
                        }
                    }));
                }
            })
        })
    }

    productMatch(some){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.ProductoMatch,[some],(err,results)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+ err))
                }
                else{
                    resolve(results.map(productos=>{
                        return{
                            id:productos.idPRODUCTO,
                            nombre:productos.nombre,
                            proovedor:productos.proovedor,
                            precio:productos.precio,
                            precio_compra:productos.precio_compra,
                            stock:productos.stock,
                            descripcion:productos.descripcion,
                            categoria:productos.categoria,
                            image_url:productos.image_url
                        }
                    }))
                }
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
