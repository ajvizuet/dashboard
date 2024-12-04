import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

import Item from '../interface/Item';
import { useEffect, useState } from 'react';

const variables: (keyof Item)[] = ["precipitation", "humidity", "clouds", "temperature"];

interface LineChartProp {
    itemsIn: Item[];
    selected: number;
}

export default function LineChartWeather(props: LineChartProp) {
    let [labels, setLabels] = useState<String[]>([]);
    let [vData, setVData] = useState<number[]>([]);
    useEffect(() => {
        if(props.itemsIn) {
            setLabels(props.itemsIn.map((item) => item['dateStart'].split("T")[1]));
            setVData(props.itemsIn.map((item) => Number(item[variables[props.selected]])));
        }
    }, [props])
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Componente para un gráfico de líneas */}
            <LineChart
                height={300}
                series={[
                    { data: vData, label: variables[props.selected] },
                ]}
                xAxis={[{ scaleType: 'point', data: labels }]}
            />
        </Paper>
    );
}