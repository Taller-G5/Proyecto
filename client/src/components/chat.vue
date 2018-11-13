<template>
    <v-container class="containerC">
        <div class="messages">
                <message class="mess" v-for="(mess,key) in messages" :key="key" :message="mess"></message>
        </div>
        <v-form fluid class="chat">
            <v-layout>
                <v-flex xs12 sm10>
                    <v-text-field
                        v-model="message"
                        color="black"
                        placeholder="Escribe algo..."
                        required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                    <v-btn @click="sendMessage" @keyup.enter="sendMessage" :disabled ="!disabled" fab small dark color="blue"><v-icon dark>send</v-icon></v-btn>
                </v-flex>
        </v-layout>
    </v-form>
    
  </v-container>
</template>

<script>
import {ApiAiClient} from 'api-ai-javascript';
import Message from '@/components/Message'
let client=null
export default {
    name:"chat",
    components:{
        Message
    },
    data(){
        return{
            message:"",
            messages:[],
            questions:[]
        }
    },
    mounted(){
        client = new ApiAiClient({accessToken:'7f413107e0054e8a8613f77a3fa47636'})
    },
    computed:{
        disabled:function() {
            return (this.message!='' && this.message!=' ')
        }      
    },
    methods:{
        sendMessage: function() {
            client.textRequest(this.message)
                .then(response=>{
                    let result = response.result
                    let metadata = result.metadata
                    let res = ""
                    if(metadata.intentName=="Producto-service"){
                        if(result.fulfillment.messages[1]!=undefined){
                            let data = JSON.parse(result.fulfillment.messages[1].speech)
                            res = data
                        }
                        else{
                            res ="Disculpa no te entendido, podrias repetirlo."
                        }
                        
                    }
                    else{
                        res = result.fulfillment.speech
                    }
                    this.messages.push(res)
                    this.message = ""
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}
</script>
<style scoped>
   .containerC{
        max-width: 400px;
        flex-direction: column;
        margin-right: 0px;
    }
    .messages{
        height: 500px;
        overflow-y: scroll;
        background-color: #2196F3;
    }
    .chat{
        border-style: solid;
        border-width: 4px;
        border-color: #2196F3;
        padding: 5px;
    }
    ul{
        list-style: none;
        padding: 10px;
    }
    li{
        color: white;
        font-size: 18px;
    }
    .mess{
        margin-bottom: 0px;
    }
</style>
