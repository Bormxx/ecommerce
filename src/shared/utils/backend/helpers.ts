export const hideEmail = (email: string): string => {
  const partsOfEmail = email.split("@");
  const separator = "****@";
  if (partsOfEmail[0].length <= 3) {
    return partsOfEmail[0] + separator + partsOfEmail[1];
  }
  return partsOfEmail[0].slice(0, 3) + separator + partsOfEmail[1];
}