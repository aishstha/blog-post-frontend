import * as storage from 'utils/storage';

import CONSTANTS from 'constants/appConstant';

const { ACCESS_TOKEN, PROFILE_PICTURE } = CONSTANTS;

/**
 * Set access token
 * @param {string} token
 */

export function setAccessToken(token) {
  storage.set(ACCESS_TOKEN, token);
}

/**
 * @return {string}
 */

export function getAccessToken() {
  return storage.get(ACCESS_TOKEN);
}

/**
 * Make local storage empty
 */

export function clear() {
  storage.clear();
}

/**
 * Add profile picture into local storage
 */

export function setProfilePicture(pictureUrl) {
  storage.set(PROFILE_PICTURE, pictureUrl);
}

/**
 * Get profile picture from local storage
 */

export function getProfilePicture() {
  if (!storage.get(PROFILE_PICTURE)) {
    return 'https://picsum.photos/40/40/?random';
  }

  return storage.get(PROFILE_PICTURE);
}
