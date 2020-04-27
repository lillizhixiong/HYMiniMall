import request from "./network.js";

function getCates() {
  return request({
    url: "/categories"
  });
}

export {
  getCates
}