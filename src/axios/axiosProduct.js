import axios from 'axios';

export default axios.create({
  baseURL: 'https://angular-app-42ed0.firebaseio.com',
});
