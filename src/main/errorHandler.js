import { isObject } from 'lodash';

const mewApiError = 'Websocket connection failed';

export const knownErrors = {
  'Can\'t assign to property "request"': mewApiError,
  "Cannot create property 'request'": mewApiError,
  'Load failed':
    'eth_subscribe is not supported. Please make sure your provider supports eth_subscribe'
};

const handleError = err => {
  const errorValues = Object.keys(knownErrors);
  const foundError = errorValues.find(item => {
    const message =
      err && err.message
        ? isObject(err.message)
          ? err.message.message
          : err.message
        : err;
    if (!message) return false;
    return message.includes(item);
  });
  return foundError ? true : false;
};

export default handleError;
