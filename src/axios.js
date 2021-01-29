import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://whatsapp-backend-app-mern.herokuapp.com',
    baseURL:'http://localhost:9000',
});

export default instance;