import http from "./config";

const worker = {
  create: (data) => http.post("/worker", data),
  get: (params) => http.get("/workers", { params }),
  delete: (id) => http.delete(`/worker/${id}`),
  update: (data) => http.put("/worker", data),
};

export default worker;
