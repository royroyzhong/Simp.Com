const login = async (input) => {
  const response = await fetch("http://localhost:8888/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

const getUser = async () => {
  const response = await fetch("http://localhost:8888/login", {
    method: "GET",
    headers: {
      Authorization: sessionStorage.getItem("token"),
    },
  });
  return response.json();
};

export default {
  login,
  getUser,
};
