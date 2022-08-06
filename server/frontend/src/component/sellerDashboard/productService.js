export const restockProduct = async (name) => {
  const response = await fetch('/restock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(product)
    body:name,
  })

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg)
  }
  return data;
}

export default {
  restockProduct
}