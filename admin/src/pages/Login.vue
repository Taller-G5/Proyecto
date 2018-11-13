<template>
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-4">
              <v-toolbar dark color="blue-grey darken-4">
                <v-toolbar-title>INICIAR SESION</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
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
                  <v-btn block color="light-blue darken-4 white--text" @click="login" :loading="loading">INGRESAR</v-btn>
                <v-spacer></v-spacer>             
              </v-card-actions>
              <v-alert :value="success" type="error">{{message}}</v-alert>
            </v-card>
          </v-flex>
        </v-layout>
        
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {HTTP} from '../http-commons.js'

export default {
  data: () =>( { 
        loading: false,
        user: {},
        message:'',
        success:false
  }),
  methods: {
    login () {
      this.loading = true;
      HTTP.post('login',this.user).then(response=>{
        if(response.data.success){
          this.$session.start()
          this.$session.set('jwt',response.data.token)
          this.$session.set('user',response.data.user)
          this.loading = false
          window.getApp.$emit('APP_LOGIN_SUCCESS');
        }
        else{
          this.loading = false
          this.message = response.data.message
          this.success = true
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 100%;
    width: 100%;
    background-image: url("/static/fondo.jpg");
    background-size: 100vw 100vh;
    background-attachment: fixed;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
</style>
