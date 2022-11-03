import { WiDaySunny } from 'react-icons/wi';
import { Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from 'react';
import styles from './PrevisaoAtual.module.css';

function PrevisaoAtual({cidade, uf, tempatual, tempmax, tempmin, termica, pressaoatm, umidade, vento}){
    
    const [expand, setExpand] = useState(false);
    return(
        <>
            <div className={styles.row}>
                <h1 className={styles.cityName}>{cidade}, {uf}</h1>
                <div className={styles.card}>
                    <p className={styles.cityName}>Hoje</p>
                    <h1>{tempatual}°C</h1>
                    <h1><WiDaySunny size={70}/></h1>
                    <Collapse in={expand}>
                        <table className={styles.weathertab}>
                            <tr>
                                <td className={styles.td1}>Sensação Térmica</td>
                                <td className={styles.td2}>{termica}°C</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Pressão Atmosférica</td>
                                <td className={styles.td2}>{pressaoatm} hPa</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Umidade</td>
                                <td className={styles.td2}>{umidade}%</td>
                            </tr>
                            <tr>
                                <td className={styles.td1}>Velocidade do Vento</td>
                                <td className={styles.td2}>{vento} km/h</td>
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