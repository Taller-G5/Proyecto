<template>
    <v-container>
      <v-flex xs12 sm8 md4>
          <v-text-field
            label="Buscar producto"
            append-icon="search"
            v-model="search"
            single-line
          ></v-text-field>
        </v-flex>
        <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Producto {{itemEdit.id}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="itemEdit.nombre" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="itemEdit.precio" type="number" label="Precio Venta"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="itemEdit.proovedor" type="text" label="Proovedor"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                            :items="['INYECTABLE','PASTILLA','JARABE']"
                            label="Categoria"
                            v-model="itemEdit.categoria"
                            required
                            ></v-select>
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <v-textarea
                            name="input-7-1"
                            outline
                            v-model="itemEdit.descripcion"
                            label="Descripcion"
                            auto-grow
                            ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <v-alert :value="success" type="success">{{message}}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click.native="close">Salir</v-btn>
            <v-btn color="green darken-1" flat @click.native="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogD" max-width="500px">
                    <v-card>
                        <v-card-title class="headline indigo darken-4 white--text">
                            <span class="headline">Estas seguro de eliminar este Producto?</span>
                        </v-card-title>
                        <v-card-text>
                        Al eliminar el producto se borrara toda existencia de la Base de datos y ya no se podra recuperar.
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" flat @click.native="closeD">Cancelar</v-btn>
                            <v-btn color="green darken-1" flat @click='deleteD'>Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
        <v-data-table :headers="headers"
                    :search ="search"
                    :items="desserts"
                    class="elevation-1">
                    <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                            <span slot="activator">
                                {{ props.header.text }}
                            </span>
                            <span>
                                {{ props.header.text }}
                            </span>
                        </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td class="text-xs-left">{{ props.item.nombre }}</td>
                        <td class="text-xs-left"><img class="image_photo" :src="props.item.image_url"></td>                      
                        <td class="text-xs-left">{{ props.item.proovedor }}</td>
                        <td class="text-xs-left">{{ props.item.categoria }}</td>
                        <td class="text-xs-left">{{ props.item.precio_compra }}</td>
                        <td class="text-xs-left">{{ props.item.precio }}</td>
                        <td class="text-xs-left">{{ props.item.stock }}</td>  
                        <td class="text-xs-left">
                            <v-icon
                                color="indigo"
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                color="red"
                                small
                                @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>      
                        
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        El producto "{{ search }}" no obtuvo resultados.
                    </v-alert>               
        </v-data-table> 
        <v-alert :value="successD" type="success">{{messageD}}</v-alert> 
         <v-snackbar
            v-model="snackbar"
            :color="color"
            :timeout="timeout"
            multi-line
            right
            >
            <ul>
                <li v-for="(t,index) in text.split(',') " :key="index" v-if="t!=''">
                    {{t}}
                </li>
            </ul>
            <v-btn
                dark
                flat
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>  
    </v-container>
    
</template>

<script>
import {HTTP} from '../http-commons.js'


export default {
    data(){
        return{
            headers: [
              {
                text: 'Id',
                align: 'left',
                value: 'id'
              },
            {
              text: 'Producto',
              align: 'left',
              value: 'nombre'
            },
            {text:'Imagen',sortable:false,value:'url_image'},
            { text: 'Proovedor', sortable: false,value: 'proovedor'},
            { text: 'Categoria', sortable: false,value: 'categoria'},
            { text: 'Precio(S/.) Compra', sortable: false, value: 'precio_compra'},
            { text: 'Precio(S/.) Venta', sortable: false, value: 'precio'},
            { text: 'Stock', sortable: false,value: 'stock'},
            { text: 'Acciones', value: 'name', sortable: false }
        ],
        desserts: [],
        search:null,
        itemEdit:{},
        itemDelete:{},
        dialog:false,
        dialogD:false,
        message:'',
        success : false,
        successD:false,
        messageD:'',
        snackbar:false,
        timeout:6000,
        color:'error',
        text:""
        }
    },
    mounted(){
      this.getProducts()
    },
    methods:{
      getProducts : async function(){
        HTTP.url_product.get("products").then(resp=>{
          this.desserts = resp.data;
          this.verify(this.desserts)
        })
      },
      editItem(item){
          HTTP.url_product.get(`search/${item.id}`).then(res=>{
              this.itemEdit=res.data
              this.dialog = true
          })
      },
      deleteItem(item){
          this.dialogD=true
          this.itemDelete = item
      },
      close(){
          this.dialog=false
          this.success=false
          this.itemEdit={}
      },
      save(){
          this.itemEdit.nombre = this.itemEdit.nombre.toUpperCase()
          console.log(this.itemEdit)
          HTTP.url_product.put("update",this.itemEdit).then(res=>{
              let response = res.data
              if(response.success){
                  this.success = true
                  this.message = response.message
                  this.itemEdit={}
                  this.getProducts()
              }
          })
          .catch(err=>{
              console.log(err)
          })
      },
      closeD(){
          this.dialogD=false
      },
      verify(array){
          let text = ""
          this.snackbar=false
          if(array.length>0){
              for (let index = 0; index < array.length; index++) {
              const element = array[index];
              if(element.stock<=2){
                    text +=`Producto ${element.nombre} con poco stock,`
                    this.text = text
                    this.snackbar = true
              }
          }
          
          }      
      },
      deleteD(){
          HTTP.url_product.delete(`delete/${this.itemDelete.id}`).then(res=>{
              let response = res.data
              if(response.success){
                this.dialogD = false
                this.messageD = response.message
                this.successD = true
                this.getProducts()
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
    .inspire{
        padding: 10px;
    }
    .image_photo{
        width: 100px;
        height: 100px;
        padding: 5px;
    }
</style>
