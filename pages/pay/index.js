// pages/cart/index.js
import {
  chooseAddress,
  showModal,
  showToast
} from "../../utils/asyncWx"

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num
    });
    this.setData({
      cart,
      address,
      totalPrice,
      totalNum
    })
  },
  handleOrderPay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log("已存在token");
  }
})