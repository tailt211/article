import { UserInfo } from "../model/account/local-user-info";

export function getLocalToken() {
  const token = window.localStorage.getItem("token");
  return token;
}

export function setLocalToken(value: string) {
  window.localStorage.setItem("token", value);
  window.dispatchEvent(new Event("storage"));
}

export function getLocalUserInfo() {
  const info = window.localStorage.getItem("userInfo");
  return info ? JSON.parse(info) : "";
}

export function setLocalUserInfo(value: UserInfo) {
  window.localStorage.setItem("userInfo", JSON.stringify(value));
  window.dispatchEvent(new Event("storage"));
}

export function clearLocalStorage(triggerEvent?: any) {
  window.localStorage.clear();
  if (triggerEvent) window.dispatchEvent(new Event("storage"));
}
