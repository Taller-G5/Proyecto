<template>
    <div>
        <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
        <h3>Total Ingresos: <span class="green--text">S/.{{total_ingresos}}</span></h3>
        <h3>Total Gastos: <span class="red--text"> S/.{{total_gastos}}</span></h3>
    </div>
</template>

<script>
import highcharts from 'highcharts'
export default {
    props:['ventas','compras'],
    data(){
        return{
            title:'',
            chartType: 'Line',
            seriesColor: '#6fcd98',
            colorInputIsSupported: null,
            animationDuration: 1000,
            updateArgs: [true, true, {duration: 1000}],
            chartOptions:{
                chart:{
                    type:'column'
                },
                title: {
                    text: 'Grafico de Flujo de Ingresos y Egresos'
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                yAxis: {
                    title: {
                    text: 'Soles S/.'
                    }
                },
                xAxis:{
                    categories: [],
                    title:{
                        text:"Dia"
                    },
                    crosshair: true
                },
                
                series: [
                    {
                        name: 'Ingresos',
                        data: [],
                        color:'#1B5E20'
                    }, 
                    {
                        name: 'Egresos',
                        data: [],
                        color:'#B71C1C'
                    }
                ],
                responsive: {
                    rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                    }]
                }
            },
            total_ingresos:0,
            total_gastos:0
        }
    },
    mounted(){
        let dataV = this.ventas
        let dataC = this.compras
        let _labelsV = this.getlabelsV(dataV)
        let _labelsC = this.getlabelsC(dataC)
        let labelsG=this.uniq(_labelsV.concat(_labelsC))
        this.sortLabels(labelsG)
        let totalVentas = this.getVentas(dataV,labelsG)
        let totalCompras = this.getCompras(dataC,labelsG)
        this.total_ingresos = this.total(totalVentas)
        this.total_gastos = this.total(totalCompras)
        this.chartOptions.xAxis.categories = labelsG
        this.chartOptions.series[0].data = totalVentas
        this.chartOptions.series[1].data = totalCompras
    },
    methods:{
        getlabelsV:function(array) {
            let labels = []
            array.forEach(element => {
                if(!labels.includes(element.fecha_venta))
                    labels.push(element.fecha_venta)
            });

            return labels;
        },
        getlabelsC:function(array) {
            let labels = []
            array.forEach(element => {
                if(!labels.includes(element.fecha_compra))
                    labels.push(element.fecha_compra)
            });

            return labels;
        },
        getVentas:function(data,labels){
            let total=0
            let total_array = []
            let _data = data
            for (let index = 0; index < labels.length; index++) {
                _data.forEach(venta=>{
                    if(venta.fecha_venta == labels[index])
                        total += venta.total_venta 
                })
                total_array.push(total)
                total=0;
                
            }
            return total_array
        },
        sortLabels:function(labels){
            for(var i=0;i<labels.length;i++){
                if(i+1<labels.length){
                    let fecha ={
                        day : parseInt(labels[i].split("/")[0]),
                        mes : parseInt(labels[i].split("/")[1])
                    }
                    let fecha_next = {
                        day : parseInt(labels[i+1].split("/")[0]),
                        mes : parseInt(labels[i+1].split("/")[1])
                    }
                    if(fecha.mes>fecha_next.mes){
                        let aux = labels[i]
                        labels[i] = labels[i+1]
                        labels[i+1] = aux
                    }
                    else if(fecha.mes == fecha_next.mes){
                        if(fecha.day>fecha_next.day){
                            let aux = labels[i]
                            labels[i] = labels[i+1]
                            labels[i+1] = aux

                        }
                    }
                }
                
            }
        },
        getCompras:function(data,labels){
            let total=0
            let total_array = []
            let _data = data
            for (let index = 0; index < labels.length; index++) {
                _data.forEach(compra=>{
                    if(compra.fecha_compra == labels[index])
                        total += compra.total_gasto 
                })
                total_array.push(total)
                total=0;
                
            }
            return total_array
        },
        uniq:function(a){
            return Array.from(new Set(a));
        },
        total:function(array){
            let total=0
            array.forEach(s=>{
                total += s;
            })
            return total;
        }
    }
}
</script>


<style scoped>

</style>
