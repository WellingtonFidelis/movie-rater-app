import axios from 'react-native-axios';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
*/

// api windows const token = '1495eefde1471d75f532c373b7d10d9ac9706c79';
// linux const token = '719d5afd473cbcfcde2e451f703a050e0cde7527';
const token = 'e29386be51ab221eaeee59a73b7d70a80428907d';

const apiMovieRater = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'http://192.168.33.107:8000/api/',
});

axios.defaults.headers.common['Authorization'] = `token ${token}`;
// axios.defaults.headers.get['Content-Type'] = 'application/json';
export default apiMovieRater;