'use strict'
module.exports = (app,options)=>{
    app.get('/products',(req,res,next)=>{
        options.repository.gets().then(products=>{
            res.status(200).json(products)
        })
        .catch(next)
    })


    app.get('/search/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }

        options.repository.getByid(id).then(product=>{
            res.status(200).json(product)
        })
        .catch(next)
    })

    app.post('/register',(req,res,next)=>{
      let producto = req.body
      options.repository.register(product).then(resp=>{
          res.status(200).json(resp)
      })
      .catch(next)
    })

    app.put('/update',(req,res,next)=>{
        let product = req.body
        options.repository.update(product).then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })

    app.delete('/delete/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }
        options.repository.delete(id).then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })
}
