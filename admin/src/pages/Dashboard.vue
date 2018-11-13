<template>
  <v-container>
    
    <highline v-if="listoV && listoC" :ventas="ventas" :compras="compras"></highline>
    
    <highpie v-if="listoP" :products="products"></highpie>
    
  </v-container>
</template>

<script>
import highline from '@/components/HighLine'
import highpie from '@/components/HighPie'
import {HTTP} from '../http-commons.js'
export default {
  components: {
     highline,
     highpie
  },
  data(){
    return{
      ventas:[],
      compras:[],
      products:[],
      listoV:false,
      listoC:false,
      listoP:false
    }
  },
  mounted(){
    this.getProducts()
   this.getCompras()
   this.getVentas() 
  },
  computed: {
   
  },
  methods:{
    getVentas:function(){
      HTTP.url_detalle.get('total_venta').then(res=>{      
            this.ventas = res.data
            this.listoV = true
          })
          .catch(err=>{
            console.log(err)
          })
    },
    getCompras:function(){
      HTTP.url_product.get('total_compra').then(res=>{
        this.compras=res.data
        this.listoC = true
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getProducts:function(){
      HTTP.url_product.get('totalProductos').then(res=>{
        this.products = res.data
        this.listoP = true
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }

};
</script>

<style>

</style>
