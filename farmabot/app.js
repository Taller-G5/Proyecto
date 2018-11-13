const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const config = require('./config')
const request = require('request')

const app = express()
const port = config.PORT
//config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

let connection = mysql.createConnection(config.db)
let querys = {
    getproducts:`SELECT * FROM PRODUCTO`,
    MatchProduct:`SELECT * FROM PRODUCTO where descripcion LIKE CONCAT('%',?,'%')`
}


app.post("/conversation",(req,res)=>{
    let speech = req.body.queryResult.queryText
    let parametersPI = req.body.queryResult.parameters.productoInfo
    if(parametersPI!="" && speech){
        connection.query(querys.getproducts,(err,results)=>{
            if(err){
                return new Error('A ocurrido un error: '+err)
            }
            else{
                let products = results.map(productos=>{
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
                })
                console.log(products)
                return res.json({
                    fulfillmentMessages:[
                        {
                            platform:"ACTIONS_ON_GOOGLE",
                            simpleResponses:{
                                simpleResponses:[
                                    {
                                        textToSpeech:"hello",
                                        displayText:"hello"
                                    }
                                ]
                            }
                        }
                        ,{
                            text:{
                                text:[JSON.stringify(products)]
                            }
                        }
                    ],
                    followupEventInput:{
                        name:""
                    }
            })
            }
        })
    }
    else{
        let query = req.body.queryResult.parameters.Sintomas
        connection.query(querys.MatchProduct,[query],(err,results)=>{
            if(err){
                return new Error('A ocurrido un error: '+err)
            }
            else{
                let products = results.map(productos=>{
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
                })
                console.log(products)
                return res.json({
                    fulfillmentMessages:[
                        {
                            platform:"ACTIONS_ON_GOOGLE",
                            simpleResponses:{
                                simpleResponses:[
                                    {
                                        textToSpeech:"hello",
                                        displayText:"hello"
                                    }
                                ]
                            }
                        }
                        ,{
                            text:{
                                text:[JSON.stringify(products)]
                            }
                        }
                    ],
                    followupEventInput:{
                        name:""
                    }
            })
            }
        })
    }   
})


app.listen(port,()=>{
    console.log(`FarmaBot listeng on port: ${port}`)
})