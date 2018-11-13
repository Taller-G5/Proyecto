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
                        <v-text-field append-icon="attach_money" name="precio_compra" label="Precio de Compra" type="number" v-model="product.precio_compra"></v-text-field>
                        <v-text-field append-icon="attach_money" name="precio" label="Precio de Venta" type="number" v-model="product.precio"></v-text-field>
                        <v-text-field append-icon="store" name="stock" label="Stock" type="number" v-model="product.stock"></v-text-field>
                        <v-textarea
                            name="input-7-1"
                            outline
                            v-model="product.descripcion"
                            label="Descripcion"
                            auto-grow
                            ></v-textarea>
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
                <v-btn block color="light-blue darken-4 white--text" :loading="loading" :disabled="isValid" @click="saved">Guardar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <v-alert :value="success" type="success">{{message}}</v-alert>
            </v-card>
   </v-container>
</template>

<script>
import {HTTP} from '../http-commons.js'
import moment from 'moment-timezone'
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
    computed:{
        isValid(){
            if((this.product.nombre == "" || this.product.nombre== null) || (this.product.proovedor == null || this.product.proovedor == '' ) || (this.product.precio == null || this.product.precio == '') || (this.product.precio_compra == null || this.product.precio_compra == '') || (this.product.stock == null || this.product.stock == '') || (this.product.descripcion == null || this.product.descripcion == '') || (this.product.categoria == null || this.product.categoria == '')){
                return true
            }
            return false 
        }
    },
    methods:{
        saved:function(){
            this.loading = true
            this.product.nombre = this.product.nombre.toUpperCase()
            this.product.fecha_registro = this.getfecha()
            let formData = new FormData()
            formData.append('nombre',this.product.nombre)
            formData.append('proovedor',this.product.proovedor)
            formData.append('precio',this.product.precio)
            formData.append('precio_compra',this.product.precio_compra)
            formData.append('stock',this.product.stock)
            formData.append('descripcion',this.product.descripcion)
            formData.append('categoria',this.product.categoria)
            formData.append('fecha_registro',this.product.fecha_registro)
            formData.append('image_url',this.product.image_url)
            HTTP.url_product.post('register',formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                    }
                }
                ).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.loading = false
                    this.success = true
                    this.message = response.message
                    this.product = {}
                    this.image=''
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        onFilePicked:function(e) {
            let files = e.target.files || e.dataTransfer.files;
            if(!files.length){
                return;
            }else{
                this.createImage(files[0])
            }
            this.product.image_url = e.target.files[0]
        },
        createImage:function(file){
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
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
