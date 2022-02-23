import client from './axios';

const authToken = (token: string) => {
  if (token) {
    client.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete client.defaults.headers.common['x-auth-token'];
  }
};

export default authToken;
