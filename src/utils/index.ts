export const filteredData = (
  data: CartItem[],
  hoveredCategory: string,
  hoveredIndex: number
) =>
  data?.filter((item: CartItem) => item.Genre.includes(hoveredCategory))[
    hoveredIndex
  ];
