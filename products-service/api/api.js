'use strict'
const cloudinary = require('cloudinary')
const config = require('../config/config')
cloudinary.config({
    cloud_name:config.cloudStorage.cloudName,
    api_key:config.cloudStorage.API_KEY,
    api_secret:config.cloudStorage.API_SECRET
})
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
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

    app.post('/register',multipartMiddleware,(req,res,next)=>{
      let product = req.body
      product.image_url=""
      let file = req.files.image_url
      if(file == undefined){
          product.image_url = "https://res.cloudinary.com/axel123/image/upload/v1541703152/medicamento_jcembd.jpg"
            options.repository.create(product).then(resp=>{
                res.status(200).json(resp)
            })
            .catch(next)
    }
      else{
        cloudinary.v2.uploader.upload(file.path,(error,result)=>{
            if(error){
                console.log(error)
            }
            else{
                product.image_url = result.url
                options.repository.create(product).then(resp=>{
                    res.status(200).json(resp)
                })
                .catch(next)
            }
        })
      }
      
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

    app.get('/total_compra',(req,res,next)=>{
        options.repository.totalGasto().then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })

    app.put('/updateLater',(req,res,next)=>{
        let product = req.body
        options.repository.updateLatest(product).then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })

    app.get('/totalProductos',(req,res,next)=>{
        options.repository.totalProductos().then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })

    app.get('/match/:query',(req,res,next)=>{
        let word = req.params.query
        options.repository.productMatch(word).then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })
}
