<template>
    <v-container v-if="listo" fluid fill-height>
        <v-layout justify-center align-center>
            <v-flex xs12 sm6 md4>
                <column :data="data" :type='type'></column>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {HTTP} from '../http-commons.js';
import column from './column_chart'
export default {
    components:{
        column
    },
    data(){
        return{
            data:[],
            type:"Dia",
            listo:false
        }
    },
    mounted(){
        HTTP.url_venta.get("ventas").then(res=>{
            this.data = res.data
            this.listo = true
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
</script>

<style>
    
</style>
