import axios from "axios";
import { baseUrl } from "../configurations/static";

//returns the data related to the VIN
export const getParts = (req: any, res: any) => {
  const PartInfo = async () => {
    let responseJson: any = {};
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

    for (let num1 in responseVpic) {
      let id: string = responseVpic[num1].ManufacturerId;
      let decodeVin: any = {};
      let modelYear: number = responseVpic[num1].ModelYear;

      //calls /vehicles/GetParts for first half of the year
      await axios.get(baseUrl + 'vehicles/GetParts?type=565&fromDate=1/1/' + modelYear + '&toDate=7/1/' + modelYear + '&format=json').then((response) => {
        let result = response.data.Results;
        for (let num2 in result) {
          if (result[num2].ManufacturerId == id) {
            decodeVin[result[num2].ModelYearFrom + '-' + result[num2].ModelYearTo + '-' + result[num2].Name] = result[num2].URL;
          }
        }
        responseVpic[num1]["decodeVin"] = decodeVin;
      });

      //calls /vehicle/GetParts for second half of the year
      await axios.get(baseUrl + 'vehicles/GetParts?type=565&fromDate=7/2/' + modelYear + '&toDate=1/1/' + (Number(modelYear) + 1) + '&format=json').then((response) => {
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
  };
  PartInfo();
}
