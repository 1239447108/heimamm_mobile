export const setToken = (name, data) => {
  window.localStorage.setItem(name, data)
}

export const getToken = name => {
  return window.localStorage.getItem(name)
}

export const removeToken = name => {
  window.localStorage.removeItem(name)
}
