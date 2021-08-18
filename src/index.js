'use strict';

const { HttpsClient, } = require('./HttpsClient');
const { Router,      } = require('./Router');

const app = new Router();

const handler = async (request, response) => {
    try {
        const body = await HttpsClient.get(`https://dataservice.accuweather.com${request.path}?${Object.keys(request.query).map(key => `${key}=${request.query[key]}`).join('&')}`);

        return response.send(body);
    } catch (error) {
        console.error(error);

        return response.sendError(502);
    }
};

app.get('/locations/v1/cities/geoposition/search', handler)
    .get('/currentconditions/v1', handler)
    .get('/forecasts/v1/hourly/12hour', handler)
    .get('/forecasts/v1/daily/5day', handler);

exports.handler = async (event, context, callback) => await app.serve(event, context, callback);
