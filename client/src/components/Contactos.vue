<template>
<v-layout row justify-center>
        <v-flex xs12 sm8 md6>
        <h1>Contactanos</h1>
        <v-card>
            <v-card-title class="indigo">
            <span class="headline white--text">Formulario</span>
            </v-card-title>
            <v-card-text>
            <v-container fluid grid-list-md fill-height>
                <v-layout wrap>
                <v-flex xs12>
                    <v-text-field label="Nombre" v-model="client.name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="Email" required v-model="client.email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-textarea
                            name="input-7-1"
                            outline
                            v-model="client.comentario"
                            label="Comentario"
                            auto-grow
                            ></v-textarea>
                </v-flex>
                </v-layout>
            </v-container>
            <small>*Todos los campos son obligatorios</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="registrar">Enviar</v-btn>
            </v-card-actions>
            <v-alert :value="success" type="success">{{message}}</v-alert>
        </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
export default {
    data(){
        return{
            client:{},
            success:false,
            message:''
        }
    },
    methods:{
        registrar(){
            this.message="Gracias por tu comentario!"
            this.success = true
        }
    },
}
</script>



<style>

</style>
