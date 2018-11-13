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
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="itemEdit.nombre" :disabled="true" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="itemEdit.stock" :disabled="true" type="number" label="Stock Actual"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="itemEdit.nuevo_stock" type="number" label="Cantidad Adquirida"></v-text-field>
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
                        <td @click="open(props.item)">{{ props.item.id }}</td>
                        <td @click="open(props.item)" class="text-xs-left">{{ props.item.nombre }}</td>
                        <td v-if="props.item.stock<=2"  @click="open(props.item)" class="text-xs-left red--text">{{ props.item.stock }}</td> 
                        <td v-else  @click="open(props.item)" class="text-xs-left">{{ props.item.stock }}</td>   
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        El producto "{{ search }}" no obtuvo resultados.
                    </v-alert>               
        </v-data-table> 
    </v-container>
</template>

<script>
import {HTTP} from '../http-commons.js'
import moment from 'moment-timezone'
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
            { text: 'Stock', sortable: false,value: 'stock'}
        ],
        desserts: [],
        search:null,
        itemEdit:{},
        dialog:false,
        message:'',
        success : false,
        snackbar:false,
        text:""
        }
    },
    mounted(){
        this.getProducts()
    },
    methods:{
        getProducts :function(){
            HTTP.url_product.get("products").then(resp=>{
                this.desserts = resp.data;
            })
        },
        close(){
          this.dialog=false
        },
        open(item){
            this.dialog = true
            this.itemEdit = {
                id:item.id,
                nombre:item.nombre,
                stock:item.stock,
                fecha_compra:this.getfecha()
            }
        },
        save(){
            HTTP.url_product.put('updateLater',this.itemEdit).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.success = true
                    this.message = response.message
                    this.itemEdit = {}
                    this.getProducts()
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
        },
        getfecha(){
            let d = moment().tz("America/Lima").format('L').toString()
            let sub_d = d.split("/")
            let _d = sub_d[1] +"/"+sub_d[0]+"/"+sub_d[2]
            return _d;
        }
    }
}
</script>



<style scoped>
    td{
        cursor: pointer;
    }
</style>
