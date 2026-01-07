export const setIsLoggedIn = (val: boolean) => {
  localStorage.setItem("isLogged", String(val));
};

export const getIsLoggedIn = () => {
  return !!localStorage.getItem("isLogged");
};
