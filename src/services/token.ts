import * as storage from "../utils/storage";

import {
  ACCESS_TOKEN,
  LOGIN_DATA,
  REFRESH_TOKEN,
  PROFIE_PICTURE,
  USER_NAME
} from "../constants/appConstant";

/**
 * Set access token
 * @param {string} token
 */
export function setAccessToken(token: string) {
  storage.set(ACCESS_TOKEN, token);
}

/**
 * Set access token
 * @param {string} token
 */
export function setRefreshToken(token: string) {
  storage.set(REFRESH_TOKEN, token);
}

/**
 * Set access token
 * @param {string} token
 */
export function setProfilePicture(image: string) {
  storage.set(PROFIE_PICTURE, image);
}

/**
 * @return {string}
 */
export function getAccessToken() {
  return storage.get(ACCESS_TOKEN);
}

/**
 * @return {string}
 */
export function setUserName(userName: string) {
  return storage.set(USER_NAME, userName);
}

/**
 * @return {string}
 */
export function getUserName() {
  return storage.get(USER_NAME);
}

/**
 * @return {string}
 */
export function getProfilePicture() {
  return storage.get(PROFIE_PICTURE);
}

/**
 * Make local storage empty
 */
export function clear() {
  storage.clear();
}

/**
 * Set login data
 * @param {string} data
 */
export async function setLoginDetails(data: any) {
  try {
    const { accessToken, refreshToken, image, name } = data;
    await storage.set(LOGIN_DATA, data);
    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);
    await setProfilePicture(image);
    await setUserName(name);

    return "done";
  } catch (error) {
    throw error;
  }
}

/**
 * Get login details
 * @return {string}
 */
export function getLoginDetails() {
  return storage.get(LOGIN_DATA);
}

/**
 * Get user id
 * @return {string}
 */
export function getUserId() {
  const loginDetails: any = storage.get(LOGIN_DATA);
  if (loginDetails) {
    return loginDetails.id;
  } else {
    return;
  }
}
