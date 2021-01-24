// pages/auth/index.js
import {
  login
} from "../../utils/asyncWx";
import {
  wxlogin
} from "../../api/pay.js";

Page({
  async handleGetUserInfo(e) {
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    const {
      code
    } = await login()
    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    };
    const res = await wxlogin(loginParams);
    console.log(res);
  }
})