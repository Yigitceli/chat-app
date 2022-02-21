export const getAccessToken = (): string | null => {
  const token = window.localStorage.getItem("accessToken");
  return token;
};
export const setAccessToken = (token: string): void => {
  window.localStorage.setItem("accessToken", token);
};
export const getRefreshToken = (): string | null => {
  const token = window.localStorage.getItem("refreshToken");
  return token;
};
export const setRefreshToken = (token: string): void => {
  window.localStorage.setItem("refreshToken", token);
};
