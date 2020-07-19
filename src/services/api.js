import axios from 'axios';
// import { toast } from 'react-toastify';

// import { store } from '~/store';
// import { signOut } from '~/store/modules/auth/actions';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// api.interceptors.response.use(undefined, error => {
//   const { signed } = store.getState().auth;

//   if (error.response && error.response.status === 401 && signed) {
//     store.dispatch(signOut());
//     toast.info('Sessão expirada');
//   }
//   return Promise.reject(error);
// });

export default api;
