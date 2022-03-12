import { AuthResult, DB_User, LogUser, RegUser } from './types/auth';
import { DB_Todo, Result, Todo } from './types/todo';

const api = {
  get: async (route: string): Promise<Result<DB_Todo[]>> => {
    let call = await fetch(`${import.meta.env.VITE_API_URL}${route}`, {
      method: 'GET',
      headers: {
        'x-auth-token': `${localStorage.getItem('token')}`,
      },
    });
    let res = await call.json();

    if (res.auth) {
      return { type: 'unauthorized', error: res.auth };
    }

    if (res.error) {
      return { type: 'error', error: new Error(res.error) };
    }

    return { type: 'success', value: res.todos };
  },
  post: async (route: string, todo: Todo): Promise<Result<DB_Todo>> => {
    let call = await fetch(`${import.meta.env.VITE_API_URL}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(todo),
    });
    let res = await call.json();

    if (res.auth) {
      return { type: 'unauthorized', error: res.auth };
    }

    if (res.error) {
      return { type: 'error', error: new Error(res.error) };
    }

    return { type: 'success', value: res };
  },
  put: async (route: string, todo: DB_Todo): Promise<Result<DB_Todo>> => {
    let call = await fetch(
      `${import.meta.env.VITE_API_URL}${route}${todo._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(todo),
      }
    );
    let res = await call.json();

    if (res.auth) {
      return { type: 'unauthorized', error: res.auth };
    }

    if (res.error) {
      return { type: 'error', error: new Error(res.error) };
    }

    return { type: 'success', value: res.todo };
  },
  delete: async (
    route: string,
    id: DB_Todo['_id']
  ): Promise<Result<DB_Todo['_id']>> => {
    let call = await fetch(`${import.meta.env.VITE_API_URL}${route}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('token')}`,
      },
    });
    let res = await call.json();

    if (res.auth) {
      return { type: 'unauthorized', error: res.auth };
    }

    if (res.error) {
      return { type: 'error', error: new Error(res.error) };
    }

    return { type: 'success', value: id };
  },
  auth: async (route: string): Promise<AuthResult<DB_User>> => {
    let call = await fetch(`${import.meta.env.VITE_API_URL}${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${localStorage.getItem('token')}`,
      },
    });

    let res = await call.json();

    if (res.auth) {
      return {
        type: 'error',
        error: res.auth,
      };
    }

    return { type: 'success', value: res };
  },
  signInOrUp: async (
    route: string,
    user: RegUser | LogUser
  ): Promise<AuthResult<string>> => {
    let call = await fetch(`${import.meta.env.VITE_API_URL}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    let res = await call.json();

    if (res.errors) {
      return {
        type: 'error',
        error: res.errors,
      };
    }

    return { type: 'success', value: res.token };
  },
};

export default api;
