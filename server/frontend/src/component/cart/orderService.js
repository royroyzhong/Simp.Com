const submitOrder = async (products) => {
  const response = await fetch('/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  })

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }

  return data;
}

const getOrder = async () => {
  const response = await fetch('/order', {
    method: 'GET'
  });
  return response.json();
};

const changeStatus = async (orderToChange) => {
  const response = await fetch('/order?orderid=' + orderToChange, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}

export default {
  submitOrder,
  getOrder,
  changeStatus
}