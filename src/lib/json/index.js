export const isValidJSON = (value) => {
  if(typeof value != 'string') {
    return false;
  }

  try {
    JSON.parse(value);

    return true;
  } catch(error) {
    return false;
  }  
}