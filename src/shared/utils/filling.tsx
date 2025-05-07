import axios from "axios";

export default async function filling(tableUrl: string, tableValue: object[]) {
  tableValue.map(async(value) => {
    try {
      await axios.post(`${tableUrl}`, value);
    } catch (e) {
      const error = await e;
      console.log(`Код ошибки ${e}: "` + error + '"');
    }
  })
}