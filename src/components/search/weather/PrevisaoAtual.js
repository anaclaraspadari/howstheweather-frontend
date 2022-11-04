import { Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from 'react';
import styles from './PrevisaoAtual.module.css';

function PrevisaoAtual({data, icon, descricao, tempatual, tempmax, tempmin, termica, pressaoatm, umidade, vento}){
    
    const [expand, setExpand] = useState(false);
    return(
        <>
            <div className={styles.row}>
                <div className={styles.card}>
                    <center><h3>{new Date(data).getDate()}/{new Date(data).getMonth()} - {new Date(data).getHours()}h</h3></center>
                    <h1>{tempatual}°C</h1>
                    <center><img src={`http://openweathermap.org/img/w/${icon}.png`} alt=""/></center>
                    <center><h4>{descricao}</h4></center>
                    <Collapse in={expand}>
                        <table className={styles.weathertab}>
                            <tr>
                                <td className={styles.td1}>Temp. Máxima</td>
                                <td className={styles.td2}>{tempmax}°C</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Temp. Mínima</td>
                                <td className={styles.td2}>{tempmin}°C</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Sensação Térmica</td>
                                <td className={styles.td2}>{termica}°C</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Pressão Atmosférica</td>
                                <td className={styles.td2}>{pressaoatm}hPa</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Umidade</td>
                                <td className={styles.td2}>{umidade}%</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Velocidade do Vento</td>
                                <td className={styles.td2}>{vento}km/h</td>
                            </tr>
                        </table>
                    </Collapse>
                    <br/>
                    <center>
                        <IconButton expand={expand} onClick={() => setExpand(!expand)}>
                            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </center>
                </div>
            </div>
        </>
    )
}

export default PrevisaoAtual