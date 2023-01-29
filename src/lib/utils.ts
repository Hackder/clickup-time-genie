type Color = {
  red: number;
  green: number;
  blue: number;
};

export const colorFromHex = (hex: string): Color => {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return { red, green, blue };
}

export const forgroundBlack = (color: Color): boolean => {
  const { red, green, blue } = color;
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
  return brightness > 125;
}
