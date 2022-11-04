import axios from "axios";

const API_KEY='4257dec76862222df13f93a320345bd9'
async function Coordenadas(nomecidade){
    try{
        const res=await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${nomecidade}&lang=pt_br&appid=${API_KEY}`)
        return res.data;
    }catch(err){
        return null;
    }
}

export default Coordenadas;