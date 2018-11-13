<template>
    <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>


<script>
import highcharts from 'highcharts'
export default{
    name:'column_chart',
    props:['data','type'],
    data(){
        return{
            title:'',
            chartType: 'Column',
            seriesColor: '#6fcd98',
            colorInputIsSupported: null,
            animationDuration: 1000,
            updateArgs: [true, true, {duration: 1000}],
            chartOptions: {
                chart: {
                    type: 'column'
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Registro de Venta'
                    }
                },
                xAxis: {
                    categories: [
                    ],
                    title:{
                        text:"Dia"
                    },
                    crosshair: true
                },
                title: {
                    text: 'Resumen de Ventas'
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name:"VENTA",
                        data: [],
                        color: '#0B0BB6'
                    },
                   
                ]
            }   
        } 
    },
    mounted(){
        let data = this.$props.data
        let type = this.$props.type
        let _labels = null
        let n_ventas=null
        if(type=="Dia"){
            _labels = this.getlabelsxDay(data)
            n_ventas = this.getVentasxDay(data,_labels)    
        }else if(type == "Mes"){
            _labels = this.getlabelsxMes(data)
            n_ventas = this.getVentasxMes(data,_labels)
            let meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SETIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"]
            _labels = _labels.map(_label=>{
                return meses[_label-1]
            })
        }else{
            _labels = this.getlabelsxAnio(data)
            n_ventas = this.getVentasxAnio(data,_labels)
        }
        this.chartOptions.xAxis.title.text = type
        this.chartOptions.xAxis.categories = _labels
        this.chartOptions.series[0].data = n_ventas
    },
    methods:{
        getlabelsxDay:function(data){
            let labels = []
            let ventas = data
            ventas.forEach(_venta=>{
                if(!labels.includes(_venta.fecha_venta))
                    labels.push(_venta.fecha_venta)
            })
            return labels
        },
        getVentasxDay: function(data,labels){
            let num_ventas = 0
            let total_ventas = []
            let ventas = data
            for(let index = 0;index<labels.length;index++){
                ventas.forEach(_venta=>{
                    if(_venta.fecha_venta == labels[index])
                        num_ventas++
                })
                total_ventas.push(num_ventas)
                num_ventas=0
            }
            return total_ventas
        },
        getlabelsxMes:function(data){
            let labels = []
            let ventas = data
            ventas.forEach(_venta=>{
                let mes = _venta.fecha_venta.split("/")[1]
                if(!labels.includes(mes))
                    labels.push(mes)
            })
            return labels
        },
        getVentasxMes: function(data,labels){
            let num_ventas = 0
            let total_ventas = []
            let ventas = data
            for(let index = 0;index<labels.length;index++){
                ventas.forEach(_venta=>{
                    if(_venta.fecha_venta.split("/")[1] == labels[index])
                        num_ventas++
                })
                total_ventas.push(num_ventas)
                num_ventas=0
            }
            return total_ventas
        },
        getlabelsxAnio:function(data){
            let labels = []
            let ventas = data
            ventas.forEach(_venta=>{
                let anio = _venta.fecha_venta.split("/")[2]
                if(!labels.includes(anio))
                    labels.push(anio)
            })
            return labels
        },
        getVentasxAnio:function(data,labels){
            let num_ventas = 0
            let total_ventas = []
            let ventas = data
            for(let index = 0;index<labels.length;index++){
                ventas.forEach(_venta=>{
                    if(_venta.fecha_venta.split("/")[2] == labels[index])
                        num_ventas++
                })
                total_ventas.push(num_ventas)
                num_ventas=0
            }
            return total_ventas
        }
    }
}

</script>


<style scoped>
</style>