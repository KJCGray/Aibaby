<template>
<div>
    <BarChart :chart-data="chartData" :options="chartOptions" />
</div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
name: 'BarChart',
components: {
    BarChart: Bar
},
data() {
    return {
    chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
        {
            label: 'Sales',
            backgroundColor: '#f87979',
            data: [40, 20, 50, 60, 30, 70]
        }
        ]
    },
    chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    };
}
};
</script>

<style scoped>
div {
width: 100%;
height: 400px;
}
</style>
