'use strict'
module.exports = (app,options)=>{
    app.get('/users',(req,res,next)=>{
        options.repository.getProducts().then(products=>{
            res.status(200).json(products)
        })
        .catch(next)
    })


    app.get('/search/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }

        options.repository.getProductByid(id).then(product=>{
            res.status(200).json(product)
        })
        .catch(next)
    })
}