<template>
    <v-container>
       <v-card class="elevation-4">
                <v-toolbar dark color="blue-grey darken-4">
                    <v-spacer></v-spacer>
                    <v-toolbar-title>FORMULARIO DE REGISTRO</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text >
                    <v-form>
                        <v-text-field append-icon="edit" name="nombre" label="Nombre" type="text" v-model="product.nombre"></v-text-field>
                        <v-text-field append-icon="local_shipping" name="proovedor" label="Proovedor" type="text" v-model="product.proovedor"></v-text-field>
                        <v-text-field append-icon="attach_money" name="precio" label="Precio" type="number" v-model="product.precio"></v-text-field>
                        <v-text-field append-icon="store" name="stock" label="Stock" type="number" v-model="product.stock"></v-text-field>
                        <v-textarea
                            name="input-7-1"
                            outline
                            label="Descripcion"
                            auto-grow
                            ></v-textarea>
                        <v-text-field append-icon="invert_colors" name="concentracion" label="Concentracion" type="number" v-model="product.concentracion"></v-text-field>
                        <v-select
                            :items="['INYECTABLE','PASTILLA','JARABE']"
                            label="Categoria"
                            v-model="product.categoria"
                            required
                            ></v-select>
                        <span><v-icon large color="light-blue darken-4">add_photo_alternate</v-icon></span><input type="file" ref="image" accept="image/*" @change="onFilePicked"/>
                        <div v-if="image" class="imageC">
                            <img class="image_preview" :src="image" alt="">
                        </div>
                    </v-form>       
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="light-blue darken-4 white--text" :loading="loading" @click="saved">Guardar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-alert :value="success" type="success">{{message}}</v-alert>
            </v-card>
   </v-container>
</template>

<script>
import {HTTP} from '../http-commons.js'
export default {
    data(){
        return{
            product:{},
            loading:false,
            message:'',
            success:false,
            image:''
        }
    },
    methods:{
        saved:function(){
            this.loading = true
            this.product.nombre = this.product.nombre.toUpperCase()
            HTTP.post('product/register',this.product).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.loading = false
                    this.success = true
                    this.message = response.message
                    this.product = {}
                }
            })
        },
        pickFile:function() {
            
        },
        onFilePicked:function(e) {
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length){
                return;
            }else{
                this.createImage(files[0])
            }
            console.log(e.target.files)
        },
        createImage:function(file){
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        }

    }
}
</script>

<style>
    .imageC{
        display: flex;
        justify-content: center;
    }
   .image_preview{
       width: 200px;
       height: 200px;
   }
</style>
