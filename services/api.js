import axios from "axios";

const API = axios.create({
    baseURL: 'http://http://localhost:8080/api/travel-app', // example: http://192.168.1.100:5000/api
    timeout: 10000, // optional: sets 10s timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  //this is not use in the app
    /* // Function to get trending destinations based on user location
    export const getTrendingDestinations = async (location) => {
        try {
            const response = await API.get(`/get-attractions/Anuradhapura`); //to make this dynamic you have to replace that aurathepura into this :${location}
            return response.data;
        } catch (error) {
            console.error('Error fetching trending destinations:', error);
            throw error;
        }
    }; */



  export default API;