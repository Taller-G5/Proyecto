<template>
    <div class="inspire">
        <v-flex x12 sm6 md12>
            <div>
                <v-toolbar flat color="white">
                <v-toolbar-title>USUARIOS</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <v-card>
                        <v-card-title class="headline indigo darken-4 white--text">
                            <span class="headline">Estas seguro de eliminar a este usuario?</span>
                        </v-card-title>
                        <v-card-text>
                        Al eliminar el usuario se borrara toda existencia de la Base de datos y ya no se podra recuperar.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click.native="close">Cancelar</v-btn>
                            <v-btn color="green darken-1" flat @click='this.delete'>Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-toolbar>
                    <v-data-table
                    :headers="headers"
                    :items="users"
                    hide-actions
                    class="elevation-1"
                    >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.username }}</td>
                        <td class="text-xs-left">{{ props.item.role }}</td>
                        <td class="justify-center layout px-0">
                        <v-icon
                            small
                            @click="deleteItem(props.item)"
                            color="red"
                        >
                            delete
                        </v-icon>
                        </td>
                    </template>
                    </v-data-table>
                    <v-alert :value="success" type="success">{{message}}</v-alert>
            </div>
        </v-flex>
    </div>
</template>

<script>
import {HTTP} from '../http-commons.js'
export default {
    data(){
        return{
            dialog: false,
            success:false,
            message:"",
            headers: [
                {
                text: 'id',
                align: 'left',
                sortable: false,
                value: 'name'
                },
                { text: 'Usuario', value: 'username' },
                { text: 'Rol', value: 'role' },
                { text: 'Acciones', value: 'name', sortable: false ,align:'center'}
            ],
            users: [],
            auxIndex: -1,
            auxItem: {
                id:0,
                username: '',
                password: 0,
                role: 0
            }
    }
    },
    mounted(){
        this.getUsers()
    },
    methods:{
      deleteItem (item) {
        this.auxIndex = this.users.indexOf(item)
        this.auxItem = Object.assign({}, item)
        this.dialog = true
        
      },
      delete(){
          HTTP.delete(`user/eliminar/${this.auxItem.id}`).then(res=>{
              let response = res.data
              if(response.success){
                  this.dialog = false
                  this.success = true
                  this.message = response.message
                  this.getUsers()
              }
          })
          .catch(err=>{
              console.log(err)
          })
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.auxItem = {}
          this.auxIndex = -1
        }, 300)
      },
      getUsers(){
          HTTP.get('user/users').then(res=>{
            this.users = res.data
        })
        .catch(err=>{
            console.log(err)
        })
      }
    }
}
</script>

<style>
    #inspire{
        padding: 15px;
    }
</style>
