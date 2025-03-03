import axios from "axios";

export default async function filling(tableUrl: any, tableValue: any) {
  tableValue.map(async(value: any) => {
    try {
      const response = await axios.post(`${tableUrl}`, value);
    } catch (e: any) {
      const error = await e.response.data.error;
      console.log(`Код ошибки ${e.status}: "` + error + '"');
    }
  })
}