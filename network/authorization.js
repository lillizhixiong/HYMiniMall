import request from "./network.js";

function getToken({data,method}) {
  return request({
    url: "/users/wxlogin",
    data,
    method
  })
}

export {
  getToken
}