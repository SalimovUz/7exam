import http from "./config";

const media = {
  upload: (productId, data) =>
    http.post(`/media/upload-photo?id=${productId}`, data),
  get: (productId) => http.get(`/media/${productId}`),
  delete: (id) => http.delete(`/media/${id}`),
};

export default media;
