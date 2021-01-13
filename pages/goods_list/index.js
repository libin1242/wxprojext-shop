// pages/goods_list/index.js
import {
  getgoodlistApi
} from "../../api/goods.js"

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: '综合',
      },
      {
        id: 1,
        value: '销量',
      }, {
        id: 2,
        value: '价格',
      }
    ],
    curindex: 0,
    goods_list: []
  },
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList();
  },
  async getGoodsList() {
    const {
      data
    } = await getgoodlistApi(this.QueryParams);
    const total = data.message.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goods_list: [...this.data.goods_list, ...data.message.goods]
    })
    wx.stopPullDownRefresh();

  },
  tabsItemChange(e) {
    const {
      index
    } = e.detail;
    this.setData({
      curindex: index
    })
  },
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多了'
      });
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh() {
    this.setData({
      goods_list: []
    })
    this.QueryParams.pagenum = 1;
    this.getGoodsList();
  }
})