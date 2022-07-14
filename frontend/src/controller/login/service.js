const login = async (input) => {
  let response, data;
  try {
    response = await fetch("http://localhost:8888/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });

    data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.errors };
    }
    return data;
  } catch (err) {
    console.log(err);
    return { status: response.status, error: data.errors };
  }
};
const googlelogin = async (input) => {
  let response, data;
  try {
    response = await fetch("http://localhost:8888/googlelogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });

    data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.errors };
    }
    return data;
  } catch (err) {
    return { status: response.status, error: data.errors };
  }
};
const signup = async (input) => {
  let response, data;
  try {
    response = await fetch("http://localhost:8888/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const errorMsg = data?.message;
      return { status: response.status, error: errorMsg };
    }
    return { status: response.status };
  } catch (err) {
    return { status: response.status, error: data.errors };
  }
};
const getUser = async () => {
  let response, data;
  try {
    response = await fetch("http://localhost:8888/login", {
      method: "GET",
      credentials: "include",
    });
    data = await response.json();
    if (!response.ok) {
      return response.status;
    }

    return { data, statusCode: response.status };
  } catch (err) {
    return { status: response.status, error: data.errors };
  }
};

const logOutUser = async () => {
  const response = await fetch("http://localhost:8888/logout", {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

export default {
  login,
  getUser,
  logOutUser,
  signup,
  googlelogin,
};
