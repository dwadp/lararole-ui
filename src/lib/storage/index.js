import * as json from '../json/index';

const storagePrefix = 'lararole';

export const store = (name, value) => {
  if(!value) {
    return;
  }

  let data = value;

  if(typeof value != 'string') {
    data = JSON.stringify(value);
  }

  localStorage.setItem(`${storagePrefix}_${name}`, data);
};

export const get = (name, defaultValue = null) => {
  const data = localStorage.getItem(`${storagePrefix}_${name}`);

  if(!data) {
    return null;
  }

  if(!data && defaultValue) {
    return defaultValue;
  }

  return json.isValidJSON(data) ? JSON.parse(data) : data;
};

export const remove = (name) => {
  localStorage.removeItem(`${storagePrefix}_${name}`);
};

export const clear = () => {
  localStorage.clear();
};