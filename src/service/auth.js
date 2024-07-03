import http from "./config";

const auth = {
  sign_up: (data) => http.post("/auth/register", data),
  sign_in: (data) => http.post("/auth/login", data),
  verify_code: (data) => http.post("/auth/verify", data),
  forgot_password: (data) => http.post("/auth/forgot-password", data),
  verify_forgot_password: (data) =>
    http.post("/auth/verify-forgot-password", data),
  update_password: (data) => http.post("/auth/update-password", data),
};

export default auth;
