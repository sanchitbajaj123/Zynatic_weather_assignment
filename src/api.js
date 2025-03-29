import axios from "axios";

export async function  getData(city){
    console.log(process.env.REACT_APP_API)
    const data= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API}&units=metric`)
    console.log(data)
    return data.data;
}
