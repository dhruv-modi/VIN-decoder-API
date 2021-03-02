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
exports.getParts = void 0;
const axios_1 = __importDefault(require("axios"));
const static_1 = require("../configurations/static");
//returns the data related to the VIN
const getParts = (req, res) => {
    const PartInfo = () => __awaiter(void 0, void 0, void 0, function* () {
        let responseJson = {};
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
        for (let num1 in responseVpic) {
            let id = responseVpic[num1].ManufacturerId;
            let decodeVin = {};
            let modelYear = responseVpic[num1].ModelYear;
            //calls /vehicles/GetParts for first half of the year
            yield axios_1.default.get(static_1.baseUrl + 'vehicles/GetParts?type=565&fromDate=1/1/' + modelYear + '&toDate=7/1/' + modelYear + '&format=json').then((response) => {
                let result = response.data.Results;
                for (let num2 in result) {
                    if (result[num2].ManufacturerId == id) {
                        decodeVin[result[num2].ModelYearFrom + '-' + result[num2].ModelYearTo + '-' + result[num2].Name] = result[num2].URL;
                    }
                }
                responseVpic[num1]["decodeVin"] = decodeVin;
            });
            //calls /vehicle/GetParts for second half of the year
            yield axios_1.default.get(static_1.baseUrl + 'vehicles/GetParts?type=565&fromDate=7/2/' + modelYear + '&toDate=1/1/' + (Number(modelYear) + 1) + '&format=json').then((response) => {
                let result = response.data.Results;
                for (let num2 in result) {
                    if (result[num2].ManufacturerId == id) {
                        decodeVin[result[num2].ModelYearFrom + '-' + result[num2].ModelYearTo + '-' + result[num2].Name] = result[num2].URL;
                    }
                }
                responseVpic[num1]["decodeVin"] = decodeVin;
            });
        }
        return res.json(responseVpic);
    });
    PartInfo();
};
exports.getParts = getParts;
//# sourceMappingURL=getParts.js.map