export function getProductWord(quantity: number) {
  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${quantity} товар`;
  } else if (
    (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return `${quantity} товара`;
  } else {
    return `${quantity} товаров`;
  }
}

export function getRatingsWord(quantity: number): string {
  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) return `${quantity} оценка`; 
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return `${quantity} оценки`;
    return `${quantity} оценок`;
}
