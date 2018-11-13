<template>
  <v-app>
    <v-toolbar class="indigo white--text">
    <img src="./assets/farmacia.png" alt="">
    <v-toolbar-title>FarmaSalud</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down ">
      <v-btn @click="route({name:'home'})" class="white--text" flat>Inicio</v-btn>
      <v-btn @click="route({name:'products'})" class="white--text" flat>Productos</v-btn>
      <v-btn @click="route({name:'about'})" class="white--text" flat>Nosotros</v-btn>
      <v-btn @click="route({name:'contactos'})" class="white--text" flat>Contactos</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <chat v-show="!hidden"></chat>
    <v-fab-transition>
        <v-btn
          class="btn-bot"
          color="indigo darken-3"
          fab
          dark
          absolute
          bottom
          right
          @click="openChat"
        >
          <v-icon>chat</v-icon>
        </v-btn>
    </v-fab-transition>
    
  </v-app>
</template>

<script>
import Home from '@/views/Home'
import Chat from '@/components/chat'
export default {
  name: 'App',
  components: {
    Home,
    Chat
  },
  data () {
    return {
      hidden:true
    }
  },
  methods:{
    route:function(path){
      this.$router.push(path)
    },
    openChat: function(){
      this.hidden = !this.hidden
    }
  }
}
</script>

<style scoped>
  img{
    background-color: white;
    width: 40px;
    height: 40px;
  }
  .btn-bot{
    margin-bottom: 20px;
  }

</style>

