import http from './restapi';

const save=data=>{
    return http.post("/save",data);
}

const search=()=>{
    return http.get("/search");
}

const WeatherService={
    search,
    save
}

export default WeatherService;