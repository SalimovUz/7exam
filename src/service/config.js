import axios from "axios";

const http = axios.create({
  baseURL: "https://store.go-clothes.uz/v1",
});

async function refreshAccessToken() {
  try {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      throw new Error("Refresh token not found");
    }

    const response = await axios.get(
      `https://store.go-clothes.uz/v1/token/${refresh}`
    );
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    return access_token;
  } catch (error) {
    console.log(error.message);
  }
}

http.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const access_token = await refreshAccessToken();
      console.log(access_token);
      if (access_token) {
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = access_token;
      } else {
        console.error("Failed");
        return Promise.reject(error);
      }
    }
  }
);

export default http;
