const Utils = {
  // --------------------------------
  //  Parse a url and break it into resource, id and verb
  // --------------------------------
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split('/');
    let request = {
      resource: null,
      point: null,
      second: null
    };
    request.resource = r[1];
    request.point = r[2];
    request.second = r[3];

    return request;
  },

  // --------------------------------
  //  Simple sleep implementation
  // --------------------------------
  sleep: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};

export default Utils;
