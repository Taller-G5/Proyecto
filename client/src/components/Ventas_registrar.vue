<template>
   <div id="container">
       <v-card class="elevation-4">
              <v-toolbar dark color="blue-grey darken-4">
                <v-toolbar-title>REPORTE Nº {{num_venta}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>{{fecha}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text >
                <v-container v-for="(item,index) in list_products" :key="index" fluid grid-list-md fill-height>
                    <v-layout  wrap>
                        <v-flex xs12 sm4>
                            <v-select
                            :items="products_name"
                            v-model="reporte[index].producto"
                            label="Producto"
                            required
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field label="Cantidad" v-model="reporte[index].cantidad" required type="Number" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-text-field label="Precio Unidad (S/.)" :value="getprice(reporte[index].producto)"  :disabled="true" required type="Number"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>           
              </v-card-text>
              <v-card-actions>
                  <v-btn fab dark color="green" @click="add">
                        <v-icon dark>add</v-icon>
                    </v-btn> 
                  <v-btn fab dark color="red" @click="remove">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                  <v-spacer></v-spacer> 
                  <v-spacer></v-spacer>
                    <v-btn block color="light-blue darken-4 white--text" :loading="loading" @click="saved">Guardar</v-btn>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <h3>Total : S/. {{total}}</h3>
                       
              </v-card-actions>

              <v-alert :value="success" type="success">{{message}}</v-alert>
            </v-card>
   </div>
</template>

<script>
import {HTTP} from '../http-commons.js'
import moment from 'moment-timezone'
export default {
    data(){
        return{
            fecha:this.getfecha(),
            loading:false,
            message:"",
            reporte:[{
                producto:'',
                cantidad:null,
                precio:''
            }],
            products_name:[],
            products:[],
            list_products:[1],
            num_venta:0,
            total:0,
            success:false
        }
    },
    mounted(){
      this.getProducts()
      this.getNumVenta()
    },
    methods:{
        saved:function(){
            this.loading= true
            let reporte_final=this.reporte.map(product=>{
                return{
                    idVENTA:this.num_venta,
                    idPRODUCTO:this.getid(product.producto),
                    cantidad:parseInt(product.cantidad),
                    precio:this.getprice(product.producto)
                }
            })
            let ventamodel= {
                idUSUARIO:JSON.parse(sessionStorage.getItem('vue-session-key')).user.id,
                fecha_venta:this.getfecha()
            }
            let data = {
                venta:ventamodel,
                detalles:reporte_final
            }
            
            HTTP.post("venta/register",data).then(res=>{
                if(res.data.success){
                    this.loading = false;
                    this.success = true;
                    this.message =res.data.message;
                    this.reporte = [{}]
                    this.list_products = [1]
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getfecha(){
            let d = moment().tz("America/Lima").format('L').toString()
            let sub_d = d.split("/")
            let _d = sub_d[1] +"/"+sub_d[0]+"/"+sub_d[2]
            return _d;
        },
        getProducts : async function(){
            HTTP.get("product/products").then(resp=>{
                this.products_name = resp.data.map(product=>{
                    return product.nombre
                }).sort();

                this.products = resp.data.map(product=>{
                    return {
                        id:product.id,
                        nombre:product.nombre,
                        precio : product.precio
                    }
                })
            })
      },
      getNumVenta : function(){
          HTTP.get("venta/num_ventas").then(resp=>{
                this.num_venta=resp.data.num_ventas+1;
          }).catch(err=>{
              console.log(err)
          })
      },
      add:function(){
          this.list_products.push(this.list_products.length+1);
          this.reporte.push({})
      },
      remove: function(){
          this.list_products.pop();
          this.reporte.pop()
      },
      getprice: function(producto){
          let result = this.products.find(p=>p.nombre==producto)
          if(result) return result.precio
      },
      getid: function(producto){
          let result = this.products.find(p=>p.nombre==producto)
          if(result) return result.id
      }
    },
    watch:{
        reporte: function(rep){
            let total = 0
            rep.forEach(element => {
                total = this.getprice(element.producto)* parseInt(element.cantidad) + total
            });
            if(!isNaN(total))
                this.total = total
        }
    }

}
</script>

<style>
    #container{
        padding: 20px;
    }
</style>
