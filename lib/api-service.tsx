import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import React from "react";

const SECRET_KET = CryptoJS.enc.Utf8.parse("1234123412341234");
const SECRET_IV = CryptoJS.enc.Utf8.parse("1234123412341234");

const encrypt = (data: any) => {
  if (typeof data === "object") {
    try {
      data = JSON.stringify(data);
    } catch (error) {
      console.log("encrypt error:", error);
    }
  }
  const dataHax = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHax, SECRET_KET, {
    iv: SECRET_KET,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
const ApiService = (data: any) => {
  return encrypt(data);
};
export default ApiService;
