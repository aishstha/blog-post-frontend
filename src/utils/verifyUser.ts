import * as tokenService from "../services/token";

export function getLoggedInUserId() {
  const userId = tokenService.getUserId();
  if (userId) {
    return userId;
  }
  return false;
}
