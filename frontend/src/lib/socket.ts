export const URL = import.meta.env.REACT_APP_BACKEND_URL_BASE == '' || import.meta.env.REACT_APP_BACKEND_URL_BASE == '/' ? 'http://localhost:3000' : import.meta.env.REACT_APP_BACKEND_URL_BASE;

// export const newSocket = io(URL, { withCredentials: true, autoConnect: false });