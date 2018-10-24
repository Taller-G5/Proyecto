<template>
    <div id="container">
        <v-flex xs12 sm8 md4 lg6>
            <v-card class="elevation-4">
                <v-toolbar dark color="blue-grey darken-4">
                    <v-spacer></v-spacer>
                        <img class="img_perfil" src="/static/user.png" alt="imagen">
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text >
                    <v-form>
                        <v-text-field :disabled=disable name="login" label="Usuario" type="text" v-model="user.username"></v-text-field>
                        <v-text-field :disabled=disable name="password" label="Contraseña" type="password" v-model="user.password"></v-text-field>
                        <v-select
                        :disabled=disable
                        :items="['ADMINISTRADOR','OPERADOR']"
                        label="Tipo de Usuario"
                        v-model="user.role"
                        required
                        ></v-select>
                    </v-form>       
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block :disabled=disable color="light-blue darken-4 white--text" :loading="loading" @click="saved">Guardar</v-btn>                
                <v-spacer></v-spacer>
                <v-icon
                    :disabled=!disable
                    x-large
                    @click="edit"
                    color="green"
                >
                    edit
                </v-icon>
                
              </v-card-actions>
              <v-alert :value="success" type="success">{{message}}</v-alert>
            </v-card>
        </v-flex>
   </div>   
</template>


<script>
import {HTTP} from '../http-commons.js'
export default {
    data(){
        return{
            user:{},
            id:0,
            disable:true,
            message:"",
            success:false,
            loading:false,
            password:""
        }
    },
    mounted(){
        this.getUser()
    },
    methods:{
        getUser(){
            let is_session = sessionStorage.getItem("vue-session-key");
            if(is_session == "{}"){
                this.$router.push({name:'Login'})
            }    
            else{
                this.id = JSON.parse(is_session).user.id;
            }
            HTTP.get(`user/search/${this.id}`).then(res=>{
                this.user = res.data
                this.password= this.user.password
            })
            .catch(err=>{
                console.log(err)
            })
        },
        edit(){
            this.disable = false
        },
        saved(){
            this.loading = true
            if(this.user.password != this.password){
                this.user.changeP = true
            }
            HTTP.put('user/actualizar',this.user).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.loading = false
                    this.success = true
                    this.message = response.message
                    this.disable = true
                    this.getUser()
                    
                }
            })
        }
    }
}
</script>


<style scoped>
    #container{
        display: flex;
        justify-content: center;
    }
    .img_perfil{
        width: 120px;
        height: 120px;
    }

</style>
