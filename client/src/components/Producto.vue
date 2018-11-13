<template>
    
      <v-card>
        <v-img
          :src="product.image_url"
          aspect-ratio="1"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{product.nombre}}</h3>
            <div>{{product.descripcion}}</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="indigo">Precio: S/.{{product.precio}}</v-btn>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn flat color="orange">Stock: {{product.stock}}</v-btn>
        </v-card-actions>
      </v-card>
 
</template>


<script>
export default {
    props:['product']    
}
</script>




<style scoped>

</style>
