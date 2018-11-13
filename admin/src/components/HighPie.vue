<template>
    <v-flex xs12 sm8 md12>
        <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
    </v-flex>
</template>

<script>
import highcharts from 'highcharts'
export default {
    name:"donut_chart",
    props:["products"],
    data(){
        return{
           title: '',
            chartType: 'Pie',
            seriesColor: '#6fcd98',
            colorInputIsSupported: null,
            animationDuration: 1000,
            updateArgs: [true, true, {duration: 1000}],
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Cantidad de Productos Vendidos'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [
                    {
                        name:"Porcentaje Producto",
                        data: [
                            {
                                name:"",
                                y:0,
                                sliced:true,
                                selected:true
                            },
                            {
                                name:"",
                                y:0
                            },
                            {
                                name:"Otros",
                                y:0
                            }
                        ]
                    }
                ]
            }   
        } 
    },
    mounted(){
        let data = this.products
        let labels = this.getlabels(data)
        let total = this.getTotal(data,labels)
        let _t = this.arreglo(labels,total)
        let nuevoTotal = _t.sort((a,b)=>{
            if(b.total > a.total){
                return 1
            }
            if(b.total<a.total){
                return -1
            }
            return 0
        })
        this.chartOptions.series[0].data[0].name = nuevoTotal[0].producto
        this.chartOptions.series[0].data[1].name = nuevoTotal[1].producto
        this.chartOptions.series[0].data[0].y = nuevoTotal[0].total
        this.chartOptions.series[0].data[1].y = nuevoTotal[1].total
        //this.chartOptions.series[0].data[2].y = nuevoTotal[2].total
    },
    methods:{
        getlabels:function(array){
            let labels = []
            array.forEach(element => {
                if(!labels.includes(element.producto))
                    labels.push(element.producto)
            });
            return labels;
        },
        getTotal:function(data,labels){
            let total=0
            let total_array = []
            let _data = data
            for (let index = 0; index < labels.length; index++) {
                _data.forEach(producto=>{
                    if(producto.producto == labels[index])
                        total += producto.total 
                })
                total_array.push(total)
                total=0;
            }
            return total_array
        },
        arreglo:function(labels,products){
            let _total = []
            for (let index = 0; index < labels.length; index++) {
                const element = labels[index];
                let s = {
                    producto:element,
                    total:products[index]
                }
                _total.push(s)
            }
            return _total
        }
        
    }
}
</script>

<style scoped>
</style>