import Grid from '@mui/material/Grid2';
import './App.css';

import IndicatorWeather from './components/IndicatorWeather';
import ControlWeather from './components/ControlWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  {/* Use Effect */ }
  useEffect(() => {
    let request = async () => {
      let API_KEY = "91e7c4e3183178a7887637bdf8596270";
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
      let savedTextXML = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      let dataToIndicators: Indicator[] = new Array<Indicator>();

      let name = xml.getElementsByTagName("name")[0].innerHTML || "";
      dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name });

      let location = xml.getElementsByTagName("location")[1];

      let latitude = location.getAttribute("latitude") || "";
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude });

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      setIndicators(dataToIndicators);
    };
    request();
  }, []);
  return (
    <Grid container spacing={5}>

      {
        indicators
          .map(
            (indicator, idx) => (
              <Grid key={idx} size={{ xs: 12, lg: 3 }}>
                <IndicatorWeather
                  title={indicator["title"]}
                  subtitle={indicator["subtitle"]}
                  value={indicator["value"]} />
              </Grid>
            )
          )
      }

      <Grid size={{ xs: 12, lg: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <ControlWeather />
          </Grid>
          <Grid size={{ xs: 12, lg: 9 }}>
            <TableWeather />
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <LineChartWeather />
      </Grid>

    </Grid>
  )
}

export default App
