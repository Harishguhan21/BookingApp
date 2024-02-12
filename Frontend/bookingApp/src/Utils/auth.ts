export const clearAll = () => {
  localStorage.clear();
};

export const setToken = (token: any) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  return localStorage.getItem("token");
};
