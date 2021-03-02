import axios from "axios";

//returns all the tesla models between 2015 to 2020
export const models = (req: any, res: any) => {
  const getModels = async () => {
    const years = [2015, 2016, 2017, 2018, 2019, 2020];
    const baseUrl = "https://vpic.nhtsa.dot.gov/api/";
    const responseJson: any = {};
    for (let num in years) {
      await axios.get(`${baseUrl}vehicles/GetModelsForMakeYear/make/tesla/modelyear/${years[num]}?format=json`).then((response) => {
        responseJson[years[num]] = response.data.Results;
      });
    }
    return res.json(responseJson);
  }
  getModels();
}
