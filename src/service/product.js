import http from "./config";

const product = {
  create: (data) => http.post("/product", data),
  get: (params) => http.get("/products", { params }),
  get_product: (id) => http.get(`/product/${id}`),
  delete: (id) => http.delete(`/product/${id}`),
  update: (data) => http.put("/product", data),
};

export default product;
