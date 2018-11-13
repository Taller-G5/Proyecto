<template>
    <v-container>
        <div class="options">
        <v-btn @click="newProduct" color="success">Nuevo Producto</v-btn>
        <v-btn @click="updateProducto"  color="info">Actualizar Producto</v-btn>
        </div>
        <div v-if="isNewP"> 
            <producto-registrar></producto-registrar>
        </div>
        <div v-if="isUpdateP">
            <product-update></product-update>
        </div>
    </v-container>    
</template>



<script>
import ProductoRegistrar from '@/components/Producto_registrar'
import ProductUpdate from '@/components/Producto_update'
export default {
    components:{
        ProductoRegistrar,
        ProductUpdate
    },
    data(){
        return{
            isNewP:false,
            isUpdateP:false
        }
    },
    methods:{
        newProduct:function(){
            this.isUpdateP=false
            this.isNewP = true
        },
        updateProducto:function(){
            this.isNewP = false
            this.isUpdateP = true
        }
    }
}
</script>




<style scoped>
    .options{
        display: flex;
        justify-content: center;
    }
</style>
