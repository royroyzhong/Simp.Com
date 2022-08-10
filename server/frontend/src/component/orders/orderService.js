const submitOrder = async (products) => {
  let response, data;
  try {
    response = await fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    data = await response.json();
    if (!response.ok) {
      return response.status;
    }
    return { status: response.status, data: data };
  } catch (err) {
    return { res: response, status: response.status };
  }
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
