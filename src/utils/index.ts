export const filteredData = (
  data: CartItem[],
  hoveredCategory: string,
  hoveredIndex: number
) =>
  data?.filter((item: CartItem) => item.Genre.includes(hoveredCategory))[
    hoveredIndex
  ];

export const isAccessValid = (purchaseTime: Date) => {
  const currentTime = new Date().getTime();
  const purchaseTimestamp = new Date(purchaseTime).getTime();
  const accessPeriod = 5 * 60 * 1000; // 5minutes

  return currentTime - purchaseTimestamp < accessPeriod;
};
