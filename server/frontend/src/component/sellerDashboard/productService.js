export const restockProduct = async (name) => {
  console.log("service",name)
  const response = await fetch('/restock?name='+name, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(product)
    // body:JSON.stringify(name),
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