import axios from 'axios';

const clientAxios=axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL
});
clientAxios.defaults.headers['Content-Type'] = 'text/plain';
clientAxios.defaults.headers.common['Accept']='text/plain';
clientAxios.defaults.headers.common['X-API-KEY']='e2ffd312-b59a-11ea-b3de-0242ac130004';

clientAxios.interceptors.request.use(async (config) => {
    try{
        
    }
    catch(e)
    {
        
    }
    return config;
});
export default clientAxios;