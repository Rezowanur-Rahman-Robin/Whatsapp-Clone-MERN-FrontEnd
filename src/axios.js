import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://whatsapp-backend-app-mern.herokuapp.com',
});

export default instance;