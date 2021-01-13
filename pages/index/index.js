//Page Object
import {
  getswpierdataApi,
  getcarddataApi,
  getfloordataApi
} from "../../api/goods.js"
Page({
  data: {
    // 轮播图数据
    swiperList: [],
    cardList: [],
    floorList: []
  },
  onLoad: function (options) {
    this.getswpierdata();
    this.getcarddata();
    this.getfloordata()
  },
  async getswpierdata() {
    const {
      data
    } = await getswpierdataApi()
    this.setData({
      swiperList: data.message
    })

  },
  async getcarddata() {
    const {
      data
    } = await getcarddataApi()
    this.setData({
      cardList: data.message
    })
  },
  async getfloordata() {
    const {
      data
    } = await getfloordataApi()
    this.setData({
      floorList: data.message
    })
  }

});