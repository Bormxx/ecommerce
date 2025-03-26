export const getItemsCarousel = async () => {
  const response = await fetch(`/api/products/carousel`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}
export const getPhotosForItemCarousel = async (id: number) => {
  const response = await fetch(`/api/products/carousel`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}