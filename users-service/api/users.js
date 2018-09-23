'use strict'
module.exports = (app,options)=>{
    app.get('/users',(req,res,next)=>{
        options.repository.getUsers().then(users=>{
            res.status(200).json(users)
        })
        .catch(next)
    })


    app.get('/search/:id',(req,res,next)=>{
        let id = req.params.id
        if(!id){
            throw new Error("Se espero un id en la ruta")
        }

        options.repository.getUserByid(id).then(user=>{
            res.status(200).json(user)
        })
        .catch(next)
    })

    app.post('/login',(req,res,next)=>{
        let user = req.body
        options.repository.login(user.username,user.password).then(resp=>{
            res.status(200).json(resp)
        })
        .catch(next)
    })

    app.post('/register',(req,res,next)=>{
        let user = req.body;
        options.repository.register(user)
            .then(resp=>{
                res.status(200).json(resp)
            })
        .catch(next)
    })
}