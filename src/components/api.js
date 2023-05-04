import axios from 'axios';

const token = JSON.parse(localStorage.getItem("token"));
const isLoggedIn = JSON.parse(localStorage.getItem("user"));
const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    headers: { Authorization: "Bearer " + token }
});

// const jwtInterceptor = axios.create({});
if (isLoggedIn) {
  const loggedUserId = isLoggedIn._id;

  api.interceptors.request.use(
    (config) => {
      let token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 428) {
        const responseOf = await axios.post(
          "http://localhost:8000/refresh-token",
          {
            _id: loggedUserId,
          }
        );
        const newToken = responseOf.data.token;
        const config = error.config;
        config.headers["Authorization"] = `Bearer ${newToken}`;
        localStorage.setItem("token", JSON.stringify(newToken));
        alert("continue? token is gone ");
        return axios(config);
      }
      return Promise.reject(error);
    }
  );
}


export default api; 