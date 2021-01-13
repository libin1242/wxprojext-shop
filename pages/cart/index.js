// pages/cart/index.js
import {
  chooseAddress
} from "../../utils/asyncWx"

Page({
  data: {
    address: {}
  },
  onShow() {
    const address = wx.getStorageSync("address");
    this.setData({
      address: address
    }) 
  },
  
  async handleChooseAddress() {
    const address = await chooseAddress();
    wx.setStorageSync("address", address);
  }
})