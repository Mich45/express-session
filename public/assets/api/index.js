export const getRequest = async (url, options) => { 
  return await fetch(url, options).then((response) => response.json())
  };
  
