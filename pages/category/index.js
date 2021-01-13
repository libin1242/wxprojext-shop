// pages/category/index.js
import {
  getcateApi
} from "../../api/goods.js"
Page({

  data: {
    leftMenuList: [],
    rightMenuList: [],
    currentIndex: 0,
    topNum: 0
  },

  Cates: [],
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates');
    if (!Cates) {
      this.getcate();
    } else {
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getcate();
      } else {
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },
  async getcate() {
    const {
      data
    } = await getcateApi();
    this.Cates = data.message;
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    })
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightMenuList = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  handleTapItem(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightMenuList = this.Cates[index].children;
    this.setData({
      rightMenuList,
      currentIndex: index,
      topNum: 0
    })
  }

})