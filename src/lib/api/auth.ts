import { PUBLIC_API_URL } from '$env/static/public';
import type { User } from '$lib/types/sprintlog';

const loginUser = async (email: string, password: string): Promise<String> => {
  try {
    const response = await fetch(`${PUBLIC_API_URL}/api/access/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        username: email,
        password: password
      })
    });
    if (!response.ok) {
      throw new Error('User or Password Error');
    }

    const token = response.headers.get('Authorization');

    if (token === null) {
      throw new Error('User or Password Error');
    }

    return token;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const getCurrentUser = async (token: string): Promise<User> => {
  let response;
  try {
    response = await fetch(`${PUBLIC_API_URL}/api/me`, {
      credentials: 'include',
      headers: {
        Authorization: `${token}`
      }
    });
    if (!response.ok) throw Error();
    const data = await response.json();
    return data;
  } catch (err) {
    throw response;
  }
};

const createUser = async (email: string, password: string): Promise<any> => {
  // Check if user exists
  fetch(`${PUBLIC_API_URL}/api/access/signup`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: email.split('@')[0],
      isSuperuser: false
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};


const logout = async(): Promise<any> => {
 
  fetch(`${PUBLIC_API_URL}/api/access/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};

export { loginUser, getCurrentUser, createUser, logout };
