import request from "./network.js";

function getGoodDetail(data) {
  return request({
    url: "/goods/detail",
    data
  });
}

export {
  getGoodDetail
}