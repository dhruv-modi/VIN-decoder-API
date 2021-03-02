import path from "path";
import express, { response } from "express";
const app = express();
import bodyParser from "body-parser";
import morgan from "morgan";
import apicache from "apicache";
import cors from "cors";

// controller imports
import { models } from './controller/getModels';
import { decodeVin, decodeVinExtended, decodeVinBulk } from './controller/getVin';
import { getParts } from './controller/getParts';

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// cache
const cache = apicache.middleware;
app.use(express.static(path.join(__dirname, '../client/public')));

const PORT = process.env.PORT || 5000;

app.get('/getModels', cache('15 minutes'), models);

app.get('/getVin', cache('15 minutes'), decodeVin);

app.get('/getVin/detailed', cache('15 minutes'), decodeVinExtended);

app.get('/getVin/bulk', cache('15 minutes'), decodeVinBulk);

app.get('/getParts', cache('15 minutes'), getParts);

const server = app.listen(PORT, () => {
});

module.exports = server;