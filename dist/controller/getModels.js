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
exports.models = void 0;
const axios_1 = __importDefault(require("axios"));
//returns all the tesla models between 2015 to 2020
const models = (req, res) => {
    const getModels = () => __awaiter(void 0, void 0, void 0, function* () {
        const years = [2015, 2016, 2017, 2018, 2019, 2020];
        const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
        const responseJson = {};
        for (let num in years) {
            yield axios_1.default.get(`${baseUrl}vehicles/GetModelsForMakeYear/make/tesla/modelyear/${years[num]}?format=json`).then((response) => {
                responseJson[years[num]] = response.data.Results;
            });
        }
        return res.json(responseJson);
    });
    getModels();
};
exports.models = models;
//# sourceMappingURL=getModels.js.map