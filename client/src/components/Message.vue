<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-layout>
                    <v-flex xs2>
                        <v-avatar class="avatar">
                            <img
                                src="../assets/bot.png"
                                alt="John"
                            >
                        </v-avatar>
                    </v-flex>
                    <v-flex xs10>
                    <v-card-title primary-title>
                        <div>
                            Dice:
                            <span v-if="Array.isArray(message)">
                                <ul>
                                    <li v-for="ms in message" :key="ms.id">
                                        <v-card class="cardP">
                                            <v-card-title>
                                                <span>{{ms.nombre}}</span>
                                                <v-spacer></v-spacer>
                                                <a href="">ver</a>
                                            </v-card-title>
                                            <v-card-actions>
                                                <span class="green--text">{{"Stock: "+ms.stock}}</span>
                                                <v-spacer></v-spacer>
                                                
                                                <v-spacer></v-spacer>
                                                <span class="blue--text">{{"Precio: S/."+ms.precio}}</span>
                                                
                                            </v-card-actions>
                                        </v-card>    
                                    </li>
                                </ul>
                            </span>    
                            <span v-else>{{message}}</span>
                        </div>
                    </v-card-title>
                    </v-flex>
                    </v-layout>
                </v-card>
                
            </v-flex>    
        </v-layout>
    </v-container>    
</template>


<script>
export default {
    props:["message"]
}
</script>



<style scoped>
    .avatar{
        margin-left: 20px;
        margin-top: 5px;
    }

    ul{
        list-style: none;
    }
    .cardP{
        margin-bottom: 4px;
    }
</style>
