<template>
        <v-container fluid fill-height >
            <v-layout justify-center align-center >
                <v-flex x12 sm6 md12>
                    <reporte-item v-for="(detalle,index) in detalles" :detalle="detalle" :key="index"></reporte-item>  
                </v-flex>
            </v-layout>
        </v-container>
          
</template>

<script>
import {HTTP} from '../http-commons.js';
import reporteItem from '@/components/reporteItem'
export default {
    data(){
        return{
            detalles:[]
        }
    },
    components:{
        reporteItem
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
                    some[pos].values.push({producto:element.producto,precio:element.precio,cantidad:element.cantidad,total:element.total,usuario:element.usuario,fecha_venta:element.fecha_venta,url:element.url})
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
            HTTP.url_detalle.get("detalles/join").then(resp=>{
                 let new_array = this.arreglar(resp.data)
                 new_array.forEach(detalle=>{
                     let total_sum = 0;
                     detalle.values.forEach(item=>{
                         total_sum = item.total + total_sum
                         detalle.usuario = item.usuario
                         detalle.fecha_venta = item.fecha_venta
                         detalle.url = item.url
                     })
                     detalle.total_sum = total_sum 
                 })
                 this.detalles= new_array.reverse()
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
    
</style>
