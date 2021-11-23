const path = require('path')
const http = require('http')

const countryBorders = require('./data/countryBorders.json').features;

const countryDetails = (coords, res)=>{
    const data = countryBorders.filter(country=> country.properties.iso_a2===coords.countryCode)[0];
    data['countryInfo'] = coords;
    res.end(JSON.stringify(data))
}
const getCountryISOcode = (jsonData, res) => {
    const options = {
        hostname: 'api.geonames.org',
        path: `/countryCodeJSON?lat=${jsonData[0]}&lng=${jsonData[1]}&username=pasqally`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        };

    const request = http.request(options, resp => {
            console.log(`status code ${resp.statusCode}`);
            resp.on('data', data => {
                const countryCodes = JSON.parse(data.toString())
                countryCodes['position'] = jsonData;
                countryDetails(countryCodes, res)
            });
    });

    request.on('error', error => {
            console.log(`error ${error}`);
    });
    
    request.end();
}

const app = async (req, res)=> {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    try{
        if(req.method === 'POST'){
            const buffers = []
    
            for await (const chunk of req) {
                buffers.push(chunk)
            }
            const data = Buffer.concat(buffers).toString();
            const jsonData = JSON.parse(data).coords;
            getCountryISOcode(jsonData, res)
           
        }else {
            res.end(JSON.stringify({coords: [0,0]}))
        }
    }catch(error) {
        console.log(error)
    }
}
module.exports = app;
