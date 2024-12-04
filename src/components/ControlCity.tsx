{/* Componentes MUI */}

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

interface selectCityProp {
    setCity: React.Dispatch<React.SetStateAction<String>>;
}
   
export default function ControlWeather({ setCity }: selectCityProp) {
    {/* Arreglo de objetos */}
    let cities = ["Guayaquil", "Quito", "Cuenca"];

    {/* Arreglo de elementos JSX */}
    let options = cities.map( (city, idx) => <MenuItem key={idx} value={city}>{city}</MenuItem> )

    {/* Manejador de eventos */}
    const handleChange = (event: SelectChangeEvent) => {
        setCity(event.target.value);
    }
    {/* JSX */}
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            <Typography mb={2} component="h3" variant="h6" color="primary">
                Pronóstico de ciudad:
            </Typography>

            <Box sx={{ minWidth: 120 }}>
                   
                <FormControl fullWidth>
                    <InputLabel id="cities-label">Ciudades</InputLabel>
                    <Select
                        labelId="cities-label"
                        id="cities-select"
                        label="cities"
                        defaultValue='-1'
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una ciudad</MenuItem>

                        {options}

                    </Select>
                </FormControl>

            </Box>
        </Paper>


    )
}
