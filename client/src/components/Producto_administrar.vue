<template>
    <div class="inspire">
      <v-flex xs12 sm6 md4>
          <v-text-field
            label="Buscar producto"
            append-icon="search"
            v-model="search"
          ></v-text-field>
        </v-flex>
        <v-data-table :headers="headers"
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
                        <td class="text-xs-left">{{ props.item.precio }}</td>
                        <td class="text-xs-left">{{ props.item.stock }}</td>                              
                        </template>                
        </v-data-table>    
    </div>
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
            { text: 'Precio(S/.)', sortable: false, value: 'precio' },
            { text: 'Stock', sortable: false,value: 'stock' },
        ],
        desserts: [],
        search:null
        }
    },
    mounted(){
      this.getProducts()
    },
    methods:{
      getProducts : async function(){
        HTTP.get("product/products").then(resp=>{
          this.desserts = resp.data;
        })
      }
    },
    watch:{
        search: function(val){
            if(val==''){
              this.getProducts()
            }
            else if(val!=" " && val!=''){
              this.$nextTick(()=>{
                let new_dessert = []
                let aux = this.desserts
                aux.map((product)=>{
                    val.split(" ").map((word)=>{
                      if(product.nombre.toLowerCase().indexOf(word.toLowerCase()) != -1){
                          new_dessert.push(product)
                      }
                })
                })
                this.desserts=new_dessert.sort()
            })
            
            }
        }
    }
}
</script>

<style>
    #inspire{
        padding: 15px;
    }
</style>
