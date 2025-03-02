import axios from "axios";

export default async function filling(usersUrl: any, tableValue: any) {
  tableValue.map(async(user: any) => {
    try {
      const response = await axios.post(`${usersUrl}`, user);
    } catch (e: any) {
      const error = await e.response.data.error;
      console.log(`Код ошибки ${e.status}: "` + error + '"');
    }
  })
}