const login = async (input) => {
  const response = await fetch("http://localhost:8888/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  // console.log(data);
  return data;
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
    data = await response.json();
    // console.log(response);
    // console.log(data);
    if (!response.ok) {
      const errorMsg = data?.message;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    return { status: response.status, error: data.errors };
  }
};
const getUser = async () => {
  const response = await fetch("http://localhost:8888/login", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    console.log("!ok");
    return response.status;
  }
  return response.status;
};
const logOutUser = async () => {
  console.log("first");
  const response = await fetch("http://localhost:8888/logout", {
    method: "GET",
    credentials: "include",
  });
  console.log(response);
  return response.json();
};

export default {
  login,
  getUser,
  logOutUser,
  signup,
};
