import axios from 'axios'

import {serverUrl} from './constants'

export const LOGIN_LINK = "auth/login";
export const REGISTER_LINK = "auth/register";
export const REQUEST_PASSWORD_LINK = "auth/forgot-password";
export const RESET_PASSWORD_LINK = "auth/reset-password";
export const LOGOUT_LINK = "auth/logout";

export async function login(email, password) {
  return await axios.post(`${serverUrl}/${LOGIN_LINK}`, { email, password }, {withCredentials: true});
}

export async function register(email, name, password) {
  return await axios.post(`${serverUrl}/${REGISTER_LINK}`, { email, name, password });
}

export async function forgotPassword(email) {
  return await axios.post(`${serverUrl}/${REQUEST_PASSWORD_LINK}`, { email });
}

export async function resetPassword(email, reset_token, password) {
  return await axios.post(`${serverUrl}/${RESET_PASSWORD_LINK}`, { email, reset_token, password });
}

export async function logout() {
  return await axios.post(`${serverUrl}/${LOGOUT_LINK}`, {}, {withCredentials: true});
}