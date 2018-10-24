<template>
    <v-app id="inspire">
            <v-content v-if="listo">
                <v-container fluid fill-height>
                    <v-layout justify-center align-center>
                        <v-flex x12 sm8 md12>
                           <column :data="data" :type='type'></column>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
    </v-app>
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
            type:"Año",
            listo:false
        }
    },
    mounted(){
        HTTP.get("venta/ventas").then(res=>{
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

