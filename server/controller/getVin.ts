import axios from "axios";
import { baseUrl } from "../configurations/static";

//decodes VIN using /vehicles/DecodeVin/
export const decodeVin = (req: any, res: any) => {
  const info = async () => {
    let responseJson: any = {};
    let responseVpic: any = {};
    await axios.get(`${baseUrl}vehicles/DecodeVin/${req.query.vin}?format=json&modelyear=${req.query.year}`).then((response) => {
      responseVpic = response.data.Results;
      for (let num in responseVpic) {
        responseJson[responseVpic[num].Variable] = responseVpic[num].Value;
      }
    })
    return res.json(responseJson);
  };
  info();
}

//decodes VIN using /vehicles/DecodeVinExtended/
export const decodeVinExtended = (req: any, res: any) => {
  const detailedInfo = async () => {
    let responseJson: any = {};
    let responseVpic: any = {};

    await axios.get(`${baseUrl}vehicles/DecodeVinExtended/${req.query.vin}?format=json&modelyear=${req.query.year}`).then((response) => {
      responseVpic = response.data.Results;
      for (let num in responseVpic) {
        responseJson[responseVpic[num].Variable] = responseVpic[num].Value;
      }
    })
    return res.json(responseJson);
  };
  detailedInfo();
}

//decodes VIN in bulk
export const decodeVinBulk = (req: any, res: any) => {
  const BulkInfo = async () => {
    let responseVpic: any = {};
    const obj: any = {
      format: 'json',
      DATA: req.body.DATA
    };

    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');

    const options: any = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: baseUrl + 'vehicles/DecodeVINValuesBatch/',
    };

    await axios(options).then((response) => {
      responseVpic = response.data.Results;
    })
    return res.json(responseVpic);
  };
  BulkInfo();
}