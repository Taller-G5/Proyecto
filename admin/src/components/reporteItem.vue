<template>
    <v-card class="elevation-4 factura">
                        <v-toolbar dark color="teal darken-4">
                            <v-toolbar-title class="inf"> 
                                <div>BOLETA Nº {{detalle.num_venta}}</div>
                                <div>FECHA DE VENTA: {{detalle.fecha_venta}}</div>
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <p class="indigo--text parrafo">   USUARIO: {{detalle.usuario}}</p>
                            <br>
                            <v-data-table
                                :headers="headers"
                                :items="detalle.values"
                                hide-actions
                                class="elevation-1"
                            >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.producto }}</td>
                                <td class="text-xs-center">{{ props.item.precio }}</td>
                                <td class="text-xs-center">{{ props.item.cantidad }}</td>
                                <td class="text-xs-center">{{ props.item.total }}</td>
                            </template>
                            </v-data-table>          
                        </v-card-text>
                    <v-card-actions>
                        <v-btn
                        :disabled="disabled"
                        @click="generatepdf(detalle.num_venta)"
                        color="light-blue accent-4"
                        :loading="loading"
                        class="white--text"
                        >
                        Generar PDF
                        <v-icon right dark>file_copy</v-icon>
                        </v-btn>
                        <a v-if="success"  @click="openURL">Abrir PDF</a>
                        <v-spacer>
                        </v-spacer>
                        <h3 class="indigo--text"><strong> TOTAL: S/. {{detalle.total_sum}}</strong></h3>
                        </v-card-actions>
                    </v-card>
</template>

<script>
import {HTTP} from '../http-commons.js';
export default {
    props:['detalle'],
    data(){
        return{
            headers: [
          {
            text: 'Producto',
            align: 'left',
            sortable: false,
            value: 'producto'
          },
          { text: 'Precio',align: 'center',sortable: false,value: 'precio' },
          { text: 'Cantidad',align: 'center',sortable: false, value: 'cantidad' },
          { text: 'Total (S/.)', align: 'center',sortable: false, value: 'total' }
        ],
        loading:false,
        href:'',
        success:false,
        disabled:false
        }
    },
    methods:{
        generatepdf:function(id) {
            this.loading=true
            HTTP.url_detalle.get(`reporte/${id}`).then(resp=>{
                let response = resp.data
                if(response.success){
                    this.loading=false
                    this.href = response.pdf_url
                    this.success=true
                    this.disabled=true;
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        openURL:function(){
            window.open(this.href,"_blank")
        }
    }
}
</script>

<style>
.factura{
        margin-bottom: 20px;
    }
    .inf{
        display: flex;
        padding: 5px;
        width: 100%;
        justify-content: space-between;
    }

    .parrafo{
        font-size: 20px;
        margin: auto;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
