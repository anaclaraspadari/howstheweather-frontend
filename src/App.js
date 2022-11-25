//import logo from './logo.svg';
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import styles from './components/search/Search.module.css';
import axios from "axios";
import PrevisaoAtual from "./components/weather/PrevisaoAtual";
import WeatherService from "./services/WeatherService";
import './App.css';
import PieChart from "./components/chart/PieChart";
import LineChart from "./components/chart/LineChart";


function App() {

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast]=useState({});
    const [dataPrevisao, setDataPrevisao]=useState({});
    const [salvo, setSalvo]=useState(false);
    const [datas, setDatas]=useState([3, 3, 3, 3, 3, 3, 3]);
    const [descricoes, setDescricoes]=useState([3, 3, 3, 3, 3, 3, 3]);
    const [temperaturas, setTemperaturas]=useState({});
    const API_KEY='4257dec76862222df13f93a320345bd9';
    const url1=`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    
    const SearchCity=(querydata)=>{
        axios.get(url1).then((res)=>{
            console.log(res.data);
            setQuery("");
            PrevisaoDoTempo(res.data);
        }).catch(function (error){
            console.log(error);
            setQuery("");
            setError({ message: "Não encontrado", query: querydata });
        })
    }

    const PrevisaoDoTempo=(citydata)=>{
        const lat=citydata[0].lat;
        const lon=citydata[0].lon;
        const url2=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=25&units=metric&lang=pt_br`;
        const fetchWeather=axios.get(url2);
        Promise.all([fetchWeather]).then((response)=>{
            const resweather=response[0].data;
            const resforecast=response[0].data.list;
            setWeather(resweather);
            setForecast(resforecast);
            SalvarPrevisao(resforecast);
            setDatas(getDatas(resforecast));
            setDescricoes(getDescricoes(resforecast));
            setTemperaturas(getTemperaturas(resforecast));
            console.log(resweather);
            console.log(resforecast[0]);
        }).catch(function (error){
            console.log(error);
            setQuery("");
            setError({ message: "Não encontrado", query: citydata });
        });
    }
    console.log(forecast);

    const SalvarPrevisao=(salvardata)=>{
        const body={
            "cidade": salvardata?.city?.name,
            "tempatual": salvardata?.main?.temp,
            "pressaoatm": salvardata?.main?.pressure,
            "termica": salvardata?.main?.feels_like,
            "umidade": salvardata?.main?.humidity,
            "vento": salvardata?.wind?.speed,
            "datahora": salvardata?.dt_txt
        };
        WeatherService.save(body).then(resp=>{
            setDataPrevisao({
                "cidade": resp?.body?.cidade,
                "tempatual": resp?.body?.tempatual,
                "pressaoatm": resp?.body?.pressaoatm,
                "termica": resp?.body?.termica,
                "umidade": resp?.body?.umidade,
                "vento": resp?.body?.vento,
                "datahora": resp?.body?.datahora
            });
            setSalvo(true);
            console.log(resp.data)
        }).catch(e => {
            console.log(e);
        });
    }

    useEffect(()=>{
        SalvarPrevisao();
        console.log("previsao salva");
    },[forecast])

    function getDatas(itens){
        const datas = [];
        for (const item of itens){
            datas.push(`${new Date(item.dt_txt).getDate()}/${new Date(item.dt_txt).getMonth()} - ${new Date(item.dt_txt).getHours()}h`);
        }
        return datas;
    }
    
    function getDescricoes(itens){
        const arr=[];
        for(const item of itens){
            arr.push(item?.weather[0]?.description);
        }
        const descs={};
        arr.forEach(element => {
            descs[element] = (descs[element] || 0) + 1;
        });
        return descs;
    }

    function getTemperaturas(itens){
        const arr=[];
        for(const item of itens){
            arr.push(parseInt(item?.main?.temp));
        }
        // const temps={};
        // arr.forEach(element => {
        //     temps[element] = (temps[element] || 0) + 1;
        // });
        return arr;
    }
    
    console.log('Arr:')
    console.log(temperaturas);
    
    return (
        <div className="App">
            <div className={styles.FormClima}>
                <h1>HowsTheWeather?</h1>
                <div className="inputField">  
                    <TextField className="searchBar" placeholder="Pesquise por uma cidade..." onChange={(e) => setQuery(e.target.value)} value={query}/>
                    <button className={styles.button} onClick={SearchCity} onChange={(e) => setQuery(e.target.value)} value={query}>Avançar</button>
                </div>
            </div>
            <h1 className={styles.searchedCity}>{weather?.city?.name}, {weather?.city?.country}</h1>
            <center><PieChart descricoes={descricoes}/></center>
            <center><LineChart datas={datas} temperaturas={temperaturas}/></center>
            {(forecast!==undefined)?
                (Object.values(forecast)?.map((day, index)=>(
                    <>
                        <PrevisaoAtual
                            key={index}
                            data={day?.dt*1000}
                            icon={day?.weather[0]?.icon}
                            descricao={day?.weather[0]?.description}
                            tempatual={day?.main?.temp}
                            tempmax={day?.main?.temp_max}
                            tempmin={day?.main?.temp_min}
                            termica={day?.main?.feels_like}
                            pressaoatm={day?.main?.pressure}
                            umidade={day?.main?.humidity}
                            vento={day?.wind?.speed}
                        />
                    </>
                ))) : null
            }
        </div>
    );
}

export default App;
