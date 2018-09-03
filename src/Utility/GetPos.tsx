export const GetPos = (e: React.MouseEvent<HTMLImageElement>) => {
  const pos = { x: e.pageX, y: e.pageY - 100 };
  return pos;
};
