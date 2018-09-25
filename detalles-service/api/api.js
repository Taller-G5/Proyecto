'use strict'
module.exports = (app,options)=>{
    app.get('/detalles',(req,res,next)=>{
        options.repository.gets().then(detalles=>{
            res.status(200).json(detalles)
        })
        .catch(next)
    })


    app.get('/search/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }

        options.repository.getByid(id).then(detalle=>{
            res.status(200).json(detalle)
        })
        .catch(next)
    })


    app.get('/detalles/join',(req,res,next)=>{
      options.repository.get_joins().then(detalles=>{
        res.status(200).json(detalles)
      })
      .catch(next)
    })
    app.post('/register',(req,res,next)=>{
      let detalle = req.body
      options.repository.create(detalle).then(resp=>{
          res.status(200).json(resp)
      })
      .catch(next)
    })
}
