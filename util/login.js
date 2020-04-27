
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      timeout:10000,
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
  login
}