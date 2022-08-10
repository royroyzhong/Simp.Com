export const restockProduct = async (productId) => {
  const response = await fetch("/restock?id=" + productId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

export const addToWishlist = async (productId) => {
  const response = await fetch("/products/addToWishlist?id=" + productId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

export const deleteFromWishlist = async (productId) => {
  const response = await fetch("/products/deleteFromWishlist?id=" + productId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

export const getWishlistStatus = async (productId) => {
  const response = await fetch("/products/getWishlistStatus?id=" + productId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message;
    throw new Error(errorMsg);
  }
  return data;
};

export default {
  restockProduct,
  addToWishlist,
  deleteFromWishlist,
};
