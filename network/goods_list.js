import request from "./network.js";

function getGoodsList(data) {
  return request({
    url: "/goods/search",
    data
  });
}

export {
  getGoodsList
}