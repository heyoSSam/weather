const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
const sdk = require('api')('@climacell-docs/v4.0.1#2kzjaw32flr3g5k2l');

let app = express();

const API_KEY_WEATHER_API = 'cb7a74a9d7a9dd9ca56d5c49de22c343';
const API_KEY_TOMORROW_API = 'OS2oj6PJqqyhgiFhCHR6TaC21zIGcAfU';
const API_KEY_WEATHERBIT_API = '89e1d90d48b1423fbbaf13e0e836cc6c';


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/city', (req,res) => {
    let city = req.body.city;
    let URL_WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER_API}`;
    let URL_TOMORROW_API = `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${API_KEY_TOMORROW_API}&timesteps=daily`
    let URL_WEATHERBIT_API = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_KEY_WEATHERBIT_API}&include=daily`
    
    
    async function cityInfo() {
        const response_bit = await axios(URL_WEATHERBIT_API);
        const response_weather = await axios(URL_WEATHER_API);
        // const response_tomorrow = await axios(URL_TOMORROW_API);
        res.render("city", {response_weather: response_weather,
            response_bit: response_bit});
    }

    cityInfo();
})

app.listen(3000, () => {
    console.log("Going");
});