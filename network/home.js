import request from "./network.js";

function getSwiperList() {
  return request({
    url: "/home/swiperdata"
  });
}

function getCateList() { 
  return request({
    url: "/home/catitems"
  });
}

function getFloorList() {
  return request({
    url: "/home/floordata"
  });
}

export {
  getSwiperList,
  getCateList,
  getFloorList
}