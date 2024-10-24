const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT ? process.env.PORT : '3000';

const axios = require('axios');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('weather/index.ejs');
});

app.post('/weather', async (req, res) => {
    const zip = req.body.zip;
    console.log(`Zip code is ${zip}`);
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${process.env.API_KEY}`,
      headers: { }
    };
    
    await axios.request(config)
    .then((response) => {
        res.render('weather/show.ejs', { data: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
  