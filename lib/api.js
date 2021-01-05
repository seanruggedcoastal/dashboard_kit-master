import axios from 'axios'

const createAxios = (token) => {

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem(token) || token}`,
      Accept: 'application/json'
    }
  });

  return instance;
}


export const POST = (url, data, token) => createAxios(token).post(url, data, token);
export const PATCH = (url, data, token) => createAxios(token).patch(url, data);
export const PUT = (url, data, token) => createAxios(token).put(url, data);
export const DELETE = (url, params, token) => createAxios(token).delete(url, { params: params || { foo: 'bar' } });
export const GET = (url, params, token) => createAxios(token).get(url, { params });

