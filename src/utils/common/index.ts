export const documentTitle: Record<string, string> = {
  "/": "Login",
  "/business": "Login",
};

export const setToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  return localStorage.clear();
};

export const formatName = (firstName: string, lastName: string) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else return "";
};
