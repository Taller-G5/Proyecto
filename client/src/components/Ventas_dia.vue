<template>
        <v-container fluid fill-height >
            <v-layout justify-center align-center >
                <v-flex x12 sm8 md12>
                    <v-card class="elevation-4 factura" v-for="(detalle,index) in desserts" :key="index">
                        <v-toolbar dark color="green darken-4">
                            <v-toolbar-title>BOLETA Nº {{detalle.num_venta}}</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="detalle.values"
                                hide-actions
                                class="elevation-1"
                            >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.producto }}</td>
                                <td class="text-xs-center">{{ props.item.precio }}</td>
                                <td class="text-xs-center">{{ props.item.cantidad }}</td>
                                <td class="text-xs-center">{{ props.item.total }}</td>
                            </template>
                            </v-data-table>          
                        </v-card-text>
                    <v-card-actions>
                        <v-spacer>
                        </v-spacer>
                        <h3 class="total"> TOTAL: S/. {{detalle.total_sum}}</h3>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
          
</template>

<script>
import {HTTP} from '../http-commons.js';
export default {
    data(){
        return{
            headers: [
          {
            text: 'Producto',
            align: 'left',
            sortable: false,
            value: 'producto'
          },
          { text: 'Precio',align: 'center',sortable: false,value: 'precio' },
          { text: 'Cantidad',align: 'center',sortable: false, value: 'cantidad' },
          { text: 'Total (S/.)', align: 'center',sortable: false, value: 'total' }
        ],
        desserts: []
        }
    },
    mounted(){
        this.getDetalles()
    },
    methods:{
        arreglar:function(data){
            let labels = this.getlabels(data);
            let idx = 0;
            let arreglo = data
            let some = [] = labels.map(label=>{
                return{
                    num_venta:label,
                    values:[]
                }
            })
            arreglo.forEach(element=>{
                if(labels.includes(element.num_venta)){
                    let pos = this.getposicion(labels,element.num_venta)
                    some[pos].values.push({producto:element.producto,precio:element.precio,cantidad:element.cantidad,total:element.total})
                }
            })
            return some;   
        },
        getlabels: function(data){
             let labels = []
             let entradas = data
             entradas.forEach(_entrada => {
                 if(!labels.includes(_entrada.num_venta))
                    labels.push(_entrada.num_venta)
             });
             return labels
        },
        getposicion: function(data,value){
            let entradas = data;
            let idx = 0;
            for (let index = 0; index < entradas.length; index++) {
                const element = entradas[index];
                if(element == value){
                    idx = index
                    break;
                }
            }
            return idx;
        },
        getDetalles:function(){
            HTTP.get("detalle/detalles/join").then(resp=>{
                 let new_array = this.arreglar(resp.data)
                 
                 new_array.forEach(detalle=>{
                     let total_sum = 0;
                     detalle.values.forEach(item=>{
                         total_sum = item.total + total_sum
                     })
                     detalle.total_sum = total_sum
                 })
                 this.desserts= new_array
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .factura{
        margin-bottom: 20px;
    }
    .total{
        color: green;
        margin-right: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
</style>
