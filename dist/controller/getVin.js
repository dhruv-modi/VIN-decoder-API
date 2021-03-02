"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeVinBulk = exports.decodeVinExtended = exports.decodeVin = void 0;
const axios_1 = __importDefault(require("axios"));
const static_1 = require("../configurations/static");
//decodes VIN using /vehicles/DecodeVin/
const decodeVin = (req, res) => {
    const info = () => __awaiter(void 0, void 0, void 0, function* () {
        let responseJson = {};
        let responseVpic = {};
        yield axios_1.default.get(`${static_1.baseUrl}vehicles/DecodeVin/${req.query.vin}?format=json&modelyear=${req.query.year}`).then((response) => {
            responseVpic = response.data.Results;
            for (let num in responseVpic) {
                responseJson[responseVpic[num].Variable] = responseVpic[num].Value;
            }
        });
        return res.json(responseJson);
    });
    info();
};
exports.decodeVin = decodeVin;
//decodes VIN using /vehicles/DecodeVinExtended/
const decodeVinExtended = (req, res) => {
    const detailedInfo = () => __awaiter(void 0, void 0, void 0, function* () {
        let responseJson = {};
        let responseVpic = {};
        yield axios_1.default.get(`${static_1.baseUrl}vehicles/DecodeVinExtended/${req.query.vin}?format=json&modelyear=${req.query.year}`).then((response) => {
            responseVpic = response.data.Results;
            for (let num in responseVpic) {
                responseJson[responseVpic[num].Variable] = responseVpic[num].Value;
            }
        });
        return res.json(responseJson);
    });
    detailedInfo();
};
exports.decodeVinExtended = decodeVinExtended;
//decodes VIN in bulk
const decodeVinBulk = (req, res) => {
    const BulkInfo = () => __awaiter(void 0, void 0, void 0, function* () {
        let responseVpic = {};
        const obj = {
            format: 'json',
            DATA: req.body.DATA
        };
        const data = Object.keys(obj)
            .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
            .join('&');
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url: static_1.baseUrl + 'vehicles/DecodeVINValuesBatch/',
        };
        yield axios_1.default(options).then((response) => {
            responseVpic = response.data.Results;
        });
        return res.json(responseVpic);
    });
    BulkInfo();
};
exports.decodeVinBulk = decodeVinBulk;
//# sourceMappingURL=getVin.js.map