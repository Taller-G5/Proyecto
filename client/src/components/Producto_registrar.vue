<template>
    <div id="container">
       <v-card class="elevation-4">
                <v-toolbar dark color="blue-grey darken-4">
                    <v-spacer></v-spacer>
                    <v-toolbar-title>FORMULARIO DE REGISTRO</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text >
                    <v-form>
                        <v-text-field append-icon="edit" name="nombre" label="Nombre" type="text" v-model="product.nombre"></v-text-field>
                        <v-text-field append-icon="attach_money" name="precio" label="Precio" type="number" v-model="product.precio"></v-text-field>
                        <v-text-field append-icon="store" name="stock" label="Stock" type="number" v-model="product.stock"></v-text-field>
                    </v-form>       
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="light-blue darken-4 white--text" :loading="loading" @click="saved">Guardar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-alert :value="success" type="success">{{message}}</v-alert>
            </v-card>
   </div>
</template>

<script>
import {HTTP} from '../http-commons.js'
export default {
    data(){
        return{
            product:{},
            loading:false,
            message:'',
            success:false
        }
    },
    methods:{
        saved:function(){
            this.loading = true
            this.product.nombre = this.product.nombre.toUpperCase()
            HTTP.post('product/register',this.product).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.loading = false
                    this.success = true
                    this.message = response.message
                    this.product = {}
                }
            })
        }
    }
}
</script>

<style>
    #container{
        padding: 10px;
    }
</style>
