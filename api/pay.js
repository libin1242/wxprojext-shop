import {
    request
} from "../request/index.js"

export const wxlogin = (data) => {
    return request({
        url: "/users/wxlogin",
        method: "post",
        data
    })
}