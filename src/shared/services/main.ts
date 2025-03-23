

export const getItems = async () => {
  const response = await fetch(`/api/items`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}