export const setIsLoggedIn = (val: boolean) => {
  localStorage.setItem("isLogged", String(val));
};

export const getIsLoggedIn = () => {
  const value = localStorage.getItem("isLogged");
  return value === "true" ? true : false;
};
