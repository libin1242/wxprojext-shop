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
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address
    })
    this.setCart(cart);
  },
  setCart(cart) {
    const allChecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num
      }
    });
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart);
  },
  async handleChooseAddress() {
    const address = await chooseAddress();
    wx.setStorageSync("address", address);
  },
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id == goods_id);
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },
  allCheck() {
    const {
      cart
    } = this.data;
    cart.forEach(v => {
      if (this.data.allChecked) {
        v.checked = false
      } else {
        v.checked = true
      }
    })
    this.setCart(cart);
  },
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation == -1) {
      const res = await showModal({
        content: '您是否要删除？',
      })
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  async handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      await showToast({
        title: "您还没有选择收货地址"
      });
      return;
    }
    if (totalNum === 0) {
      await showToast({
        title: "您还没有选购商品"
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})