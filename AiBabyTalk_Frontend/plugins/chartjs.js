import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    ArcElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
export default defineNuxtPlugin(() => {
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        RadialLinearScale,
        ArcElement,
        Filler,
        Title,
        Tooltip,
        Legend,
    )
})