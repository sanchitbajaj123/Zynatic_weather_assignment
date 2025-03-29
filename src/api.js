import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function  getData(city){
    try{
    const data= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API}&units=metric`)
    console.log(data)
    return data.data;}
    catch(error){
        if (error.response && error.response.status === 404) {
            toast.error("City not found. Please enter a valid city name.", {
              position: "top-right",
            });
          } else {
            toast.error("Something went wrong. Please try again later.", {
              position: "top-right",
            });
          }
          return null;
    }
}
export async function getCity(){
    const response = await axios.get("https://ipwho.is/");
    console.log("City:", response.data.city);
    return response.data.city;
}