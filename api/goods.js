import {
    request
} from "../request/index.js"

// 首页轮播数据
export const getswpierdataApi = (data) => {
    return request({
        url: "/home/swiperdata",
        method: "get",
        data
    })
}
// 首页导航数据
export const getcarddataApi = (data) => {
    return request({
        url: "/home/catitems",
        method: "get",
        data
    })
}
// 首页楼层数据
export const getfloordataApi = (data) => {
    return request({
        url: "/home/floordata",
        method: "get",
        data
    })
}
// 分类数据
export const getcateApi = (data) => {
    return request({
        url: "/categories",
        method: "get",
        data
    })
}
// 商品列表搜索
export const getgoodlistApi = (data) => {
    return request({
        url: "/goods/search",
        method: "get",
        data
    })
}
// 商品详情
export const getgooddetailApi = (data) => {
    return request({
        url: "/goods/detail",
        method: "get",
        data
    })
}