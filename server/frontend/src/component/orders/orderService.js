const submitOrder = async (products) => {
  const response = await fetch("/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  });
  if (response.status === 503) {
    return Promise.reject({res: response,status:response.status});
  }
  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }

  return {status:response.status,data:data};
};

const getBuyerOrder = async () => {
  const response = await fetch("/order/buyer", {
    method: "GET",
  });
  return response.json();
};

const getSellerOrder = async () => {
  const response = await fetch("/order/seller", {
    method: "GET",
  });
  return response.json();
};

const changeStatus = async (orderToChange) => {
  const response = await fetch(
    "/order?orderid=" + orderToChange.id + "&type=" + orderToChange.type,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export default {
  submitOrder,
  getBuyerOrder,
  getSellerOrder,
  changeStatus,
};
