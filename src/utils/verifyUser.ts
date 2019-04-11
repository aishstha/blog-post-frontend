import * as tokenService from "../services/token";

export function getLoggedInUserId() {
  const userId = tokenService.getUserId();
  if (userId) {
    return userId;
  }
  return "";
}

export function verifyUser(userId: string, postOwnerUserId: string) {
  if(postOwnerUserId === getLoggedInUserId()){
    return true
  }
  if (getLoggedInUserId() === userId) {
    return true;
  }
  return false;
}
