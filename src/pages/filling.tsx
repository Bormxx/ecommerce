import axios from "axios";

export default async function filling(tableUrl: string, tableValue: object[]) {
  tableValue.map(async(value: object) => {
    try {
      await axios.post(`${tableUrl}`, value);
    } catch (error) {
      // const error = await e.response.data.error;
      console.log(`Код ошибки ${error}: "` + error + '"');
    }
  })
}