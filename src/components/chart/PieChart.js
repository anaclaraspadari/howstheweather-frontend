import {Pie} from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import styles from '../chart/WeatherChart.module.css';
import randomColor from "randomcolor";

function PieChart({descricoes}){

    const dados=Object.entries(descricoes).map(([key, count]) => ({id: key, titulo: key, valor: count, cor: randomColor()}));


    const data1 = {
        labels: dados.map(dado => { return dado.titulo }),
        datasets: [{
            label: "Tempo",
            data: dados.map(dado => { return dado.valor }),
            backgroundColor: dados.map(dado => { return dado.cor}),
            hoverOffset: 4,
            type: "pie"
        }]
    };

   
    return (
        <>
            <div className={styles.weatherChart} style={{width:'20%', height:'30%'}}>
                <h1>Próx. Horas/Dias</h1>
                <div>
                    <Pie data={data1}/>
                </div>
            </div>
        </>
    );
}

export default PieChart;