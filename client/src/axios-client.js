import axios from "axios"

const axiosClient = axios.create({
    baseURL: `http://192.168.204.71`
})
    axiosClient.interceptors.request.use((config) => 
        {
            const token = localStorage.getItem('ACCESS_TOKEN')
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
    
        
        axiosClient.interceptors.response.use(
            (response) => {
              return response;
            },
            (error) => {
              console.log('Error:', error.code);
              if (error.response && error.response.status === 401) {
                localStorage.removeItem('ACCESS_TOKEN');
              }
              throw error
            }
          );


export default axiosClient