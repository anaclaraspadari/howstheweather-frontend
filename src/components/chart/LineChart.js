import {Line} from "react-chartjs-2";
import styles from '../chart/WeatherChart.module.css';
import randomColor from "randomcolor";

function LineChart({datas, temperaturas}){

    function removerDuplicadas(arr){
        return arr.filter((item,index) => arr.indexOf(item) === index);
    }
    const dataschart=removerDuplicadas(datas);
    const dadoschart=temperaturas.concat(dataschart)
    const dadostemp=Object.entries(temperaturas).map(([key, value]) => ({id: key, titulo: key, valor: value}));

    console.log("Temperaturas:")
    console.log(dadoschart);

    const data2 = {
        labels: dadostemp.map(dado => { return dado.titulo }),
        datasets: [{
            label: "Temperatura",
            data: dataschart.map(dado => { return dado }),
            borderColor: 'rgb(75, 192, 192)',
            hoverOffset: 4,
            type: "line"
        }]
    };
   
    return (
        <>
            <div className={styles.weatherChart} style={{width:'20%', height:'30%'}}>
                <h1>Temperatura</h1>
                <div>
                    <Line data={data2}/>
                </div>
            </div>
        </>
    );
}

export default LineChart;