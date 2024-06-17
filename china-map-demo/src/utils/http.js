
const get = async (url = "", params = {}) => {
  const querystring = Object.keys(params).length > 0 ? `?${new URLSearchParams(params)}` : ''
  const response = await fetch(`${url}${querystring}`, {
    method: "GET",
    headers: {
      "X-CSRFToken": localStorage.getItem("csrftoken"),
      // Cookie: 'csrftoken = InLfs4BAyaoXItXqUKUmlqeYsiANnjP4; sessionid=69b939f77366bdecbcdf24dff74637f4',
      sameSite: 'none'
    },
  });
  return response.json();
};

const post = async (url = "", body = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-CSRFToken": localStorage.getItem("csrftoken"),
    },
    body: new URLSearchParams(body),
  });
  return response.json();
};

const postForm = async (url = "", body = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-CSRFToken": localStorage.getItem("csrftoken"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });

  return response.json();
};

export default { get, post, postForm };
