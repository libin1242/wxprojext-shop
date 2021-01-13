// pages/goods_detail/main.js
import {
  getgooddetailApi
} from "../../api/goods"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    this.getGoodsDetai(goods_id);
  },

  async getGoodsDetai(goods_id) {
    const {
      data: {
        message
      }
    } = await getgooddetailApi({
      goods_id: goods_id
    })
    this.GoodsInfo = message;
    this.setData({
      goodsObj: {
        pics: message.pics,
        pics_mid: message.pics_mid,
        goods_id: message.goods_id,
        goods_price: message.goods_price,
        goods_name: message.goods_name,
        goods_introduce: message.goods_introduce
      }
    })


  },
  hanldpriewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    })
  },
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  }
})