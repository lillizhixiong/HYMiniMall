import { baseURL } from './config.js';
 
let ajaxTime = 0;
export default (params) => {
  ajaxTime++;
  return new Promise((resolve, reject) => {
  wx.showLoading({
    title: "正在加载ing",
    mask: true
  });
   wx.request({
      url: baseURL+params.url,
      data: params.data || {},
      header: {'content-type':'application/json'},
      method: params.method || "GET",
      success: (result)=>{
       
        resolve(result.data.message)
      },
      fail: (err)=>{
        reject(err);
      },
      complete:() =>{
        ajaxTime--;
        if(ajaxTime==0) {
          wx.hideLoading();
        }
      }
    });
  })
}