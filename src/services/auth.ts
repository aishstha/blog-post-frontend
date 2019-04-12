import config from "../config";
import http from "../utils/http";

const { api } = config;

export async function generateAccesstoken(data: any, id: string) {
  const url = api.endpoints.refreshToken;
  const response = await http.post(url);

  return response;
}
