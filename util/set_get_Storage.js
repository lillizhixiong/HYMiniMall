
// 1. 获取缓存数据  同步
function getStorage(key) {
  return wx.getStorageSync(key);
}


// 2. 设置缓存数据(同步)
function setStorage(key, data) {
  wx.setStorageSync(key, data);
}


export {
  getStorage,
  setStorage
}