<template>
  <v-toolbar
    color="blue darken-4"
    fixed
    dark
    app
    >
    <v-toolbar-title class="ml-0 pl-3">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
      <v-spacer></v-spacer> 
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <h5 class="texto">{{user.username}}</h5>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator">
          <v-avatar size="30px">
            <img src="/static/user.png" alt="Michael Wang"/>
          </v-avatar>
        </v-btn>
        <v-list class="pa-0">
          <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
            <v-list-tile-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import Util from '@/util';
export default {
  name: 'app-toolbar',
  data: () => ({
    items: [
      {
        icon: 'account_circle',
        href: '#/usuarios/perfil',
        title: 'Perfil',
        click: (e) => {
          window.getApp.$emit('PERFIL');
        }
      },
      {
        icon: 'exit_to_app',
        href: '#',
        title: 'Cerrar Sesion',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
    user:{}
  }),
  mounted(){
    let is_session = sessionStorage.getItem("vue-session-key");
    if(is_session == "{}"){
      this.$router.push({name:'Login'})
    }    
    else{
      this.user = JSON.parse(is_session).user;
    }
  },
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    }
  }
};
</script>
<style>
  .texto{
    color: white;
    margin: auto;
  }
</style>

