// 1. 主要是对微信提供的 api 进行 进一步的封装


// 1.获取用户授予的权限
function getSetting() {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  });
}

//2. 获取用户的收货地址( 当用户授权才能获取, 否则不许获取 )
function chooseAddress() {
  return new Promise(function (resolve, reject) {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

// 3. 引导用户打开授权页面
function openSetting() {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(reject)
      }
    });
  })
}



// 4. showModal 弹框

function showModal({content}) {
  return new Promise(function (resolve, reject) {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}


// 5. showToast 改为promise形式
function showToast({title,icon}) {
  return new Promise(function(resolve, reject) {
    wx.showToast({
      title: title,
      icon: icon || "none",
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  });
}


export {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast
}