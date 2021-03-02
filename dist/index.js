"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const apicache_1 = __importDefault(require("apicache"));
const cors_1 = __importDefault(require("cors"));
// controller imports
const getModels_1 = require("./controller/getModels");
const getVin_1 = require("./controller/getVin");
const getParts_1 = require("./controller/getParts");
// middlewares
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(morgan_1.default('dev'));
// cache
const cache = apicache_1.default.middleware;
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/public')));
const PORT = process.env.PORT || 5000;
app.get('/getModels', cache('15 minutes'), getModels_1.models);
app.get('/getVin', cache('15 minutes'), getVin_1.decodeVin);
app.get('/getVin/detailed', cache('15 minutes'), getVin_1.decodeVinExtended);
app.get('/getVin/bulk', cache('15 minutes'), getVin_1.decodeVinBulk);
app.get('/getParts', cache('15 minutes'), getParts_1.getParts);
const server = app.listen(PORT, () => {
});
module.exports = server;
//# sourceMappingURL=index.js.map