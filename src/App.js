//import logo from './logo.svg';
import { useState } from "react";
import { TextField } from "@mui/material";
import styles from './components/search/Search.module.css';
import axios from "axios";
import PrevisaoAtual from "./components/search/weather/PrevisaoAtual";
import './App.css';


function App() {

    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});
    const [forecast, setForecast]=useState({});
    const API_KEY='4257dec76862222df13f93a320345bd9';
    const url1=`http://api.openweathermap.org/geo/1.0/direct?q=${query}&appid=${API_KEY}`
    
    const Searchcity=(querydata)=>{
        axios.get(url1).then((res)=>{
            //console.log(res.data);
            setQuery("");
            CurrentWeather(res.data);
        }).catch(function (error){
            //console.log(error);
            setQuery("");
            setError({ message: "Não encontrado", query: querydata });
        })
    }

    const CurrentWeather=(citydata)=>{
        const lat=citydata[0].lat;
        const lon=citydata[0].lon;
        const url2=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pt_br`
        const fetchCurrentWeather=axios.get(url2);
        Promise.all([fetchCurrentWeather]).then((response)=>{
            const resweather=response[0].data;
            setWeather(resweather);
            //console.log(resweather);
        }).catch(function (error){
            //console.log(error);
            setQuery("");
            setError({ message: "Não encontrado", query: citydata });
        });
    }
    console.log(weather);
    return (
        <div className="App">
            <div className={styles.FormClima}>
                <h1>HowsTheWeather?</h1>
                <div className="inputField">  
                    <TextField className="searchBar" placeholder="Pesquise por uma cidade..." onChange={(e) => setQuery(e.target.value)} value={query}/>
                    <button className={styles.button} onClick={Searchcity} onChange={(e) => setQuery(e.target.value)} value={query}>Avançar</button>
                </div>
            </div>
            {(query!==null && weather!==null)&&
                <PrevisaoAtual cidade={weather.name}/>
            }
        </div>
    );
}

export default App;
