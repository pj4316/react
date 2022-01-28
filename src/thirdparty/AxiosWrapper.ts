import axios from 'axios';
import { root } from '..';
import { alertToSlack } from './SlackWebHookWrapper';

export const contentApiHandler = axios.create({
  baseURL: `${process.env.CONTENT_API_PATH}`,
  timeout: 5000,
});

export const userApiHandler = axios.create({
  baseURL: `${process.env.USER_API_PATH}`,
  timeout: 5000,
});

contentApiHandler.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    alertToSlack(error).catch(() => console.error('intercept', error));
    return Promise.reject(error);
  },
);

contentApiHandler.interceptors.response.use(
  function (response) {
    const { config, data } = response;

    // @TODO: AOP tracking api call
    // console.log('intercept',
    //   config,
    //   data,
    //   root.firebaseSessionStore.user?.uid,
    //   root.firebaseSessionStore.user?.email);

    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    alertToSlack(error).catch(() => console.error('intercept', error));
    return Promise.reject(error);
  },
);

userApiHandler.interceptors.request.use(
  async function (request) {
    const idToken = await root.firebaseSessionStore.getIdToken();

    request.headers = {
      authorization: `Bearer ${idToken}`,
      'X-Forwarded-For': '127.0.0.1',
      ...request.headers,
    }
    return request;
  },
  async function (error) {
    alertToSlack(error).catch(() => console.error('intercept', error));
    return Promise.reject(error);
  },
);

userApiHandler.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    alertToSlack(error).catch(() => console.error('intercept', error));
    return Promise.reject(error);
  },
);
