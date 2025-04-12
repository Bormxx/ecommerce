export const getBasketItems = async () => {
  const response = await fetch('api/users/basket');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export const addItemToCart = async (itemId: number) => {
  const response = await fetch('api/users/basket', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({itemId}),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const removeItemsFromCart = async (itemId: number) => {
  const response = await fetch('api/users/basket', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({itemId}),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const addItemQuantityToCart = async (itemId: number, addQuantity: number) => {
  const response = await fetch('api/users/basket', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({itemId, addQuantity}),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};