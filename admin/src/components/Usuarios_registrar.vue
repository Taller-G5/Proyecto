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
                        <v-text-field append-icon="person" name="login" label="Usuario" type="text" v-model="user.username"></v-text-field>
                        <v-text-field append-icon="lock" name="password" label="Contraseña" type="password" v-model="user.password"></v-text-field>
                        <v-select
                        :items="['ADMINISTRADOR','OPERADOR']"
                        label="Tipo de Usuario"
                        v-model="user.role"
                        required
                        ></v-select>
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
            loading:false,
            user:{},
            success:false,
            message:""
        }
    },
    methods:{
        saved:function(){
            this.loading=true
            HTTP.url_user.post('register',this.user).then(res=>{
                let response = res.data
                if(response.success){
                    this.loading = false
                    this.success = true
                    this.message = response.message
                    this.user = {}
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>
    #container{
        padding: 15px;
    }
</style>
