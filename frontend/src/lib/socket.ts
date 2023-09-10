export const URL = import.meta.env.BASE_URL == '' || import.meta.env.BASE_URL == '/' ? 'http://localhost:3000' : import.meta.env.BASE_URL;

// export const newSocket = io(URL, { withCredentials: true, autoConnect: false });