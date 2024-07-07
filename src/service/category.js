import http from "./config";

const category = {
  create: (data) => http.post("/category", data),
  get: (params) => http.get("/categories", { params }),
  delete: (id) => http.delete(`/category/${id}`),
  update: (data) => http.put("/category", data),
};

export default category;
