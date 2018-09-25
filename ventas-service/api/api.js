'use strict'
module.exports = (app,options)=>{
    app.get('/ventas',(req,res,next)=>{
        options.repository.gets().then(ventas=>{
            res.status(200).json(ventas)
        })
        .catch(next)
    })

    app.get('/num_ventas',(req,res,next)=>{
        options.repository.getsNumberRows().then(num=>{
          res.status(200).json(num)
        })
    })


    app.get('/search/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }

        options.repository.getByid(id).then(venta=>{
            res.status(200).json(venta)
        })
        .catch(next)
    })

    app.post('/register',(req,res,next)=>{
      let data = req.body
      options.repository.transaccion(data.venta,data.detalles).then(resp=>{
          res.status(200).json(resp)
      })
      .catch(next)
    })
}
