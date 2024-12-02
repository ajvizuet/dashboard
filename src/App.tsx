import Grid from '@mui/material/Grid2';
import './App.css';

import IndicatorWeather from './components/IndicatorWeather';
import ControlWeather from './components/ControlWeather';
import TableWeather from './components/TableWeather';
import LineChartWeather from './components/LineChartWeather';
import { useEffect, useState } from 'react';

import Item from './interface/Item';

interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}

function App() {
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [items, setItems] = useState<Item[]>([]);
  {/* Use Effect */ }
  useEffect(() => {
    let request = async () => {
      let API_KEY = "91e7c4e3183178a7887637bdf8596270";
      let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
      let savedTextXML = await response.text();

      const parser = new DOMParser();
      const xml = parser.parseFromString(savedTextXML, "application/xml");

      let dataToIndicators: Indicator[] = new Array<Indicator>();
      let dataToItems: Item[] = new Array<Item>();

      let name = xml.getElementsByTagName("name")[0].innerHTML || "";
      dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name });

      let location = xml.getElementsByTagName("location")[1];

      let latitude = location.getAttribute("latitude") || "";
      dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude });

      let longitude = location.getAttribute("longitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

      let altitude = location.getAttribute("altitude") || ""
      dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

      for(let i = 0; i < 6; i++) {
        let time = xml.getElementsByTagName('time')[i];
        let from = time.getAttribute('from') || "";
        let to = time.getAttribute('to') || "";

        let precipitation = time.getElementsByTagName('precipitation')[0];
        let prob = precipitation.getAttribute('probability') || "";

        let humidity = time.getElementsByTagName("humidity")[0];
        let humidityValue = humidity.getAttribute('value') || "";

        let clouds = time.getElementsByTagName("clouds")[0];
        let cloudsAll = clouds.getAttribute('all') || "";

        let item: Item = {dateStart: from, 
          dateEnd: to, 
          precipitation: prob, 
          humidity: humidityValue, 
          clouds: cloudsAll};

        dataToItems.push(item);
      };
      
      setItems(dataToItems);
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
            <TableWeather itemsIn = { items } />
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
