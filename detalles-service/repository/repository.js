const mysql = require('mysql')
const querys = require('../utils/querys')
const pdf = require('html-pdf')
const cloudinary = require('cloudinary')
const config = require('../config/config')
const options = {
    format: 'Letter',
    orientation: 'portrait'
}
cloudinary.config({
    cloud_name:config.cloudStorage.cloudName,
    api_key:config.cloudStorage.API_KEY,
    api_secret:config.cloudStorage.API_SECRET
})
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
                resolve(result.map(detalles=>{
                    return{
                        id:detalles.idDETALLE,
                        venta:detalles.idVENTA,
                        producto:detalles.idPRODUCTO,
                        cantidad:detalles.cantidad,
                        precio:detalles.stock
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
                resolve(result.map(detalle=>{
                    return{
                      id:detalle.idDETALLE,
                      venta:detalle.idVENTA,
                      producto:detalle.idPRODUCTO,
                      cantidad:detalle.cantidad,
                      precio:detalle.stock
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

    get_joins(){
      return new Promise((resolve,reject)=>{
          this.connection.query(querys.get_join,(err,results)=>{
            if(err){
                return reject(new Error('A ocurrido un error: '+err))
            }
            else{
                resolve(results.map(detalles=>{
                    return{
                        num_venta:detalles.num_venta,
                        producto:detalles.producto,
                        precio:detalles.precio,
                        cantidad:detalles.cantidad,
                        total:detalles.total,
                        usuario:detalles.usuario,
                        url:detalles.url,
                        fecha_venta:detalles.fecha_venta
                    }
                }))
            }

          })
      })
    }

    get_data_4_pdf(id){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.get_joif_4_pdf,[id],(err,results)=>{
                if(err){
                    return reject(new Error('A ocurrido un error: '+err))
                }
                else{
                    let resp = results.map(detalles=>{
                        return{
                            num_venta:detalles.num_venta,
                            producto:detalles.producto,
                            precio:detalles.precio,
                            cantidad:detalles.cantidad,
                            total:detalles.total,
                            usuario:detalles.usuario,
                            url:detalles.url,
                            fecha_venta:detalles.fecha_venta
                        }
                    })
                    let total = 0
                    let contenido = `<div style="display:flex;">
                    <div style="background: black; text-align:center;">
                        <h2 style="margin: 0 auto;
                        color: white;">BOLETA Nº ${resp[0].num_venta}</h2>
                    </div>
                    
                    <div style="background: black; padding:5px;">
                        <p style="margin: 0 auto;
                        color: white;">FECHA DE VENTA: ${resp[0].fecha_venta}</p>
                    </div>

                    <div style="background: black; padding:5px;">
                        <p style="margin: 0 auto;
                        color: white;">USUARIO: ${resp[0].usuario}</p>
                    </div>
                    
                    </div>
                    <table style= "font-family: arial, sans-serif; border-collapse: collapse; width: 100%;">
                        <tr>
                            <th style="border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;">Producto</th>
                            <th style="border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;">Precio</th>
                            <th style="border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;">Cantidad</th>
                            <th style="border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;">Total</th>
                        </tr>`
                    resp.forEach(element => {
                        total += element.precio*element.cantidad;
                        contenido += `<tr>
                                        <td style="border: 1px solid #dddddd;
                                        text-align: left;
                                        padding: 8px;">${element.producto}</td>
                                        <td style="border: 1px solid #dddddd;
                                        text-align: left;
                                        padding: 8px;">S/.${element.precio}</td>
                                        <td style ="border: 1px solid #dddddd;
                                        text-align: left;
                                        padding: 8px;">${element.cantidad}</td>
                                        <td style ="border: 1px solid #dddddd;
                                        text-align: left;
                                        padding: 8px;">S/.${element.total}</td>    
                                    </tr>`
                    });
                    contenido += `</table>
                    <div>
                        <div style="background: black; text-align:right; padding:5px;">
                        <h4 style="width:100%;
                        margin: 0 auto;
                        color: white;">Total: S/.${total}</h4>
                    </div>`
                    if(resp[0].url != null){
                        return resolve({success:true,pdf_url:resp[0].url})
                    }else{
                        pdf.create(contenido,options).toFile('./salida.pdf',(err,rs)=>{
                            if(err){
                                return reject(err)
                            }
                            else{
                                cloudinary.v2.uploader.upload(rs.filename,(err,result)=>{
                                    this.connection.query(querys.set_url,[result.url,resp[0].num_venta],(err,result)=>{});
                                    resolve({
                                        success:true,
                                        pdf_url:result.url
                                    })
                                })
                            }
                        })
                    }
                }
            })
        })
    }

    totalVenta(){
        return new Promise((resolve,reject)=>{
            this.connection.query(querys.totalVenta,(err,results)=>{
            if(err){
                return reject(new Error('A ocurrido un error: '+err))
            }
            else{
                resolve(results.map(venta=>{
                    return {
                        nombre:venta.producto,
                        total_venta:venta.total,
                        fecha_venta:venta.fecha_venta
                    }
                }));
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
