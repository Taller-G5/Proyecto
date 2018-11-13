<template>
    <v-container grid-list-md text-xs-center>
        <h1>Catalogo de Productos</h1>
        <v-layout row wrap >
            <v-flex v-for="product in products"
              :key="product.id"
              xs3>
                <producto :product="product"></producto>
            </v-flex>
        </v-layout>
    </v-container>
</template>








<script>
import Producto from '@/components/Producto'
export default {
    components:{
        Producto
    },
    data(){  
        return{
            products:[]
        }
    },
    mounted(){
        this.getProducts()
    },
    methods:{
        getProducts(){
            fetch('http://localhost:5002/products')
                .then(response=>{
                    return response.json()
                })
                .then(data=>{
                    this.products=data
                })
        }
    }
}
</script>




<style scoped>

</style>
